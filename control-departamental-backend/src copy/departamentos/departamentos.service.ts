import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateDepartamentoDto, CreateDepartamentoUbicacionDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ubicacion } from '../ubicacion/entities/ubicacion.entity';
import { Departamento } from './entities/departamento.entity';
import { Repository } from 'typeorm';
import { UbicacionService } from '../ubicacion/ubicacion.service';
import { ServiciosAsignadosService } from '../servicios-asignados/servicios-asignados.service';
import { UUID } from 'crypto';
import { User } from '../auth/entities/user.entity';
import { NotsService } from '../nots/nots.service';
import { Servicio } from '../servicios/entities/servicio.entity';
import { CreateServiciosAsignadoDto } from '../servicios-asignados/dto/create-servicios-asignado.dto';

@Injectable()
export class DepartamentosService {

  constructor(
    private readonly ubicacionService: UbicacionService,

    private readonly notsService: NotsService,

    private readonly serviciosAsignadosService: ServiciosAsignadosService,

    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,

    @InjectRepository(Ubicacion)
    private readonly ubicacionRepository: Repository<Ubicacion>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>
    


  ) {
    
  }


  async create(createDepartamentoUbicacionDto: CreateDepartamentoUbicacionDto, user_id: UUID) {

    try{
      const { 
        ubicacion: ubicacionDto, 
        departamento: departamentoDto ,
        serviciosAsignados: serviciosAsignadosDto
      } = createDepartamentoUbicacionDto;

      const ubicacion = await this.ubicacionService.create(ubicacionDto);

      if(!ubicacion) {
        throw new InternalServerErrorException('Error creating location');
      }
      const departamento = this.departamentoRepository.create( {
        ...departamentoDto
      } );

      if(!departamento) {
        throw new InternalServerErrorException('Error creating location');
      }

      await this.departamentoRepository.save(departamento);

      const departamentoEntity = await this.departamentoRepository.findOneBy({id: departamento.id});

      const ubicacionEntity = await this.ubicacionRepository.findOne({
        where: { id: ubicacion.id },
        relations: ['archivo'], // Include the related archivo entity
      });

      if(!ubicacionEntity) {
        throw new InternalServerErrorException('Error creating location');
      }

      departamentoEntity.ubicacion = ubicacionEntity;

      await this.departamentoRepository.save(departamentoEntity);

      if(serviciosAsignadosDto==null || !serviciosAsignadosDto) {
        return {
          departamentoEntity
        };
      }


      serviciosAsignadosDto.map( (servicioAsignado) => {
        servicioAsignado.id_departamento = departamentoEntity.id as UUID;
      })

      serviciosAsignadosDto.forEach(
        async (servicioAsignado) => {
          const servicioAsignadoEntity = await this.serviciosAsignadosService.create(servicioAsignado, user_id);
        }
      )

      return {
        departamentoEntity
      };



    }
    catch (error) {
      this.handleError(error);
    }

    
  }


  async findAll(id_user: UUID) {
    try{
      const departamentos = await this.departamentoRepository.find(
        {
          relations: [
            'ubicacion', 
            'ubicacion.archivo',
            'servicios',
            'servicios.servicio',
            'servicios.pago',
            'servicios.pago.archivo',
            'user'
          ], // Include the related ubicacion and archivo entities

        }

      );
      if(!departamentos) {
        throw new InternalServerErrorException('Error fetching departamentos');
      } else {
        for(let i = 0; i <  departamentos.length; i++){
          const departamento = departamentos[i];
          for(let j = 0; j < departamento.servicios.length; j++){
            let servicioAsignado = departamento.servicios[j];
            if(servicioAsignado.pago){
              servicioAsignado = await this.serviciosAsignadosService.updatePagoEstado(servicioAsignado.id as UUID);
              
              if (!this.deepEqual(servicioAsignado, departamento.servicios[j])) {
                this.notsService.create({
                  user_id: id_user,
                  tipo: 'pago',
                  titulo: 'Nuevo pago pendiente',
                  descripcion: `El pago ${servicioAsignado.pago.id + "," + departamento.servicios[i].servicio.descripcion} se ha actualizado a pendiente`,
                })
              }
            }
           

            

          }
          console.log("NotUpdating")
        }

      }
      console.log("depar")
      

      
      return departamentos;

    } catch (error){
      this.handleError(error);
    }
  }

  private deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) {
      return true;
    }

    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!keys2.includes(key) || !this.deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

async asignService(createServiciosAsignado: CreateServiciosAsignadoDto, user_id: UUID) {
    try{
      console.log("asdasd")
      const departamento = await this.findOne(createServiciosAsignado.id_departamento)

      if(!departamento){
        throw new InternalServerErrorException('Departamento not found')
      }

      const servicio = await this.servicioRepository.findOneBy({
        id: createServiciosAsignado.id_servicio
      });

      if(!servicio){
        throw new InternalServerErrorException('Servicio not found')
      }

      if(departamento.servicios.find(servicioAsignado => servicioAsignado.servicio.id == createServiciosAsignado.id_servicio)){
        throw new InternalServerErrorException('Servicio already assigned')
      }

      console.log("servicio")
      await this.serviciosAsignadosService.create(createServiciosAsignado, user_id);
      console.log("departmetn")
      return departamento;

    } catch(error){
      this.handleError(error)

    }
  }


  async asignUser(id: UUID, user_id: UUID){
    try{
      const user = await this.userRepository.findOne({
        where:{
          id: user_id
        }
      })
      if(!user){
        throw new InternalServerErrorException('User not found');
      }
      const departamento = await this.findOne(id)

      if(!departamento){
        throw new InternalServerErrorException('Departamento not found')
      }

      departamento.user = user;
      await this.departamentoRepository.save(departamento);

      await this.notsService.create({
        tipo: "Asignacion",
        titulo: "Asignacion de departamento",
        descripcion: `Se te ha asignado el departamento ${departamento.nombre}`,
        user_id: user_id
      })
      return departamento;

    } catch(error){
      this.handleError(error)

    }
  }

  async remove(id: UUID) {
    try{
      const departamento = await this.findOne(id);

      if(!departamento) {
        throw new InternalServerErrorException('Error creating location');
      }

      await this.departamentoRepository.remove(departamento);
      return departamento;
    } catch (error){
      this.handleError(error);
    }
  }



  async findOne(id: UUID) {

    try{

      const departamento = await this.departamentoRepository.findOne(
        {
          where: {id},
          relations: [
            'ubicacion', 
            'ubicacion.archivo',
            'servicios',
            'servicios.servicio',
            'servicios.pago',
            'servicios.pago.archivo',
            'user'
          ], // Include the related ubicacion and archivo entities

        }
      );
      if(!departamento) {
        throw new InternalServerErrorException('Error creating location');
      }


      
      return departamento;

    } catch (error){
      this.handleError(error);
    }
  }

  async findOneByUser(user_id: UUID) {
    try{

      const departamentos = await this.departamentoRepository.find(
        {
          where: {user: {id: user_id}},
          relations: [
            'ubicacion', 
            'ubicacion.archivo',
            'servicios',
            'servicios.servicio',
            'servicios.pago',
            'user',
            'servicios.pago.archivo'
          ], // Include the related ubicacion and archivo entities

        }
      );
      if(!departamentos) {
        throw new InternalServerErrorException('Error creating location');
      }
      return departamentos;
    } catch (error){
      this.handleError(error);
    }
  }

//   update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
//     return `This action updates a #${id} departamento`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} departamento`;
//   }

private handleError(error: any) {
  if(error instanceof UnauthorizedException) {
    throw error;
  }
  if(error instanceof InternalServerErrorException) {
    throw error;
  }
  if (error.code === '23505') {
    throw new Error('Email already exists');
  } else {
    throw new InternalServerErrorException(error.message);
  }


}
}
