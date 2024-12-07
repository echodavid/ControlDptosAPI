import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreatePagoArchivoDto, CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoArchivoDto, UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Archivo } from '../archivo/entities/archivo.entity';
import { ESTADO_PAGO, Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { NotsService } from '../nots/nots.service';
import { CreateNotDto } from '../nots/dto/create-not.dto';
import { ServiciosAsignado } from '../servicios-asignados/entities/servicios-asignado.entity';

@Injectable()
export class PagoService {

  


  constructor(
    @InjectRepository(Pago)
    private pagoRepository: Repository<Pago>,
    @InjectRepository(Archivo)
    private archivoRepository: Repository<Archivo>,

    @InjectRepository(ServiciosAsignado)
    private serviciosAsignadosRepository: Repository<ServiciosAsignado>,

    private readonly notsService: NotsService,

  ) {}

  async create(createPagoArchivoDto: CreatePagoArchivoDto, user_id: UUID) {
    try{


      const { pago: pagoDto, archivo: archivoDto } = createPagoArchivoDto;


      const archivo = this.archivoRepository.create(archivoDto);
      await this.archivoRepository.save(archivo);


      

      if(!archivo) {
        throw new InternalServerErrorException('Error creating file');
      }
      
      const pago = this.pagoRepository.create( {
        ...pagoDto,
        archivo: archivo
      } );
      

      if(!pago) {
        await this.archivoRepository.delete(archivo.id);
        throw new InternalServerErrorException('Error creating location');
      }
      pago.archivo = archivo;

      await this.pagoRepository.save(pago)
      
      return pago;
    } catch (error) {
      this.handleError(error);
    }
  }

  // findAll() {
  //   return `This action returns all pago`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} pago`;
  // }

  // update(id: number, updatePagoDto: UpdatePagoDto) {
  //   return `This action updates a #${id} pago`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} pago`;
  // }

  async update(idPago: UUID, idArchivo: UUID, updatePagoArchivo: UpdatePagoArchivoDto) {
    try{
      const pagoDto = updatePagoArchivo.pago;
      const archivoDto = updatePagoArchivo.archivo;
      const archivo = await this.archivoRepository.findOneBy({id: idArchivo});
      if(!archivo) {
        throw new InternalServerErrorException('Error fetching file');
      }
      const pago = await this.pagoRepository.findOneBy({id: idPago});
      if(!pago) {
        throw new InternalServerErrorException('Error fetching pago');
      }
      let archivoUpdates: Archivo = {
        ...archivo,
        ...archivoDto
      }
      await this.archivoRepository.save(archivoUpdates);
      let pagoUpdated: Pago = {
        ...pago,
        ...pagoDto
      }
      await this.pagoRepository.save(pagoUpdated);
      return pagoUpdated;

    } catch (error) {
      this.handleError(error);
    }

  }


  async updateEstadoAndFechas(id_pago: UUID, id_user?: UUID) {
    try{
      const pago1 = await this.pagoRepository.findOne({
        where: { id: id_pago },
        relations: ['archivo'],
      });
    const servicio = await this.serviciosAsignadosRepository.findOne(
      {
        relations: ['pago', 'servicio'],
        where: { pago: pago1 }
      }
    );
      const pago = pago1 as Pago;
      
      const currentDate = new Date();
      

      if (pago.fecha_vencimiento < currentDate ) {

        while (new Date(pago.fecha_vencimiento) < currentDate) {
          pago.fecha_vencimiento = new Date(new Date(pago.fecha_vencimiento).getTime() + pago.periodicidad * 24 * 60 * 60 * 1000);
          pago.fecha_pagar = new Date(new Date(pago.fecha_pagar).getTime() + pago.periodicidad * 24 * 60 * 60 * 1000);
        }

        pago.estado = ESTADO_PAGO.PENDIENTE;
        if(id_user){
          this.notsService.create({
            user_id: id_user,
            tipo: 'pago',
            titulo: 'Nuevo pago pendiente',
            descripcion: `El pago ${pago.id + "," + servicio.servicio.descripcion} se ha actualizado a pendiente`,
          })
        }
        
      } else {
        if (pago.fecha_pagar < currentDate && pago.estado == ESTADO_PAGO.PENDIENTE) {
          pago.estado = ESTADO_PAGO.VENCIDO;
          if(id_user){
            this.notsService.create({
              user_id: id_user,
              tipo: 'pago',
              titulo: 'Pago pendiente',
              descripcion: `El pago ${pago.id + "," + servicio.servicio.descripcion} está vencido`,
            })
          }
          
        }
      }

      await this.pagoRepository.save(pago);
      return pago;

    }catch(error) {
      console.log("error", error)
      this.handleError(error)
      }
    
    const currentDate = new Date();

  }

  async findAll() {
    try {
      const pagos = await this.pagoRepository.find({})
      if(!pagos) {
        throw new InternalServerErrorException('Error fetching pagos');
      }
      return pagos;
    } catch (error) {
      this.handleError(error);

    }
  }

  private handleError(error: any) {
    if(error instanceof UnauthorizedException) {
      throw error;
    }
    if(error instanceof InternalServerErrorException) {
      throw error;
    }
    else {
      throw new InternalServerErrorException(error.message);
    }


  }
}
