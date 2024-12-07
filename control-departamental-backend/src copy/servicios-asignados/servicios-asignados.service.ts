import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateServiciosAsignadoDto } from './dto/create-servicios-asignado.dto';
import { UpdateServiciosAsignadoDto } from './dto/update-servicios-asignado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ESTADO_ASIGNACION, ServiciosAsignado } from './entities/servicios-asignado.entity';
import { Repository } from 'typeorm';
import { Departamento } from '../departamentos/entities/departamento.entity';
import { Servicio } from '../servicios/entities/servicio.entity';
import { PagoService } from '../pago/pago.service';
import { UUID } from 'crypto';
import { NotsService } from '../nots/nots.service';
import { UpdatePagoArchivoDto } from 'src/pago/dto/update-pago.dto';
import { ESTADO_PAGO, Pago } from '../pago/entities/pago.entity';
import { Archivo } from '../archivo/entities/archivo.entity';

@Injectable()
export class ServiciosAsignadosService {
  
  
  constructor(
    @InjectRepository(ServiciosAsignado)
    private serviciosAsignadosRepository: Repository<ServiciosAsignado>,
    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,
    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>,
    @InjectRepository(Pago)
    private pagoRepository: Repository<Pago>,
    @InjectRepository(Archivo)
    private archivoRepository: Repository<Archivo>,

    private readonly pagoService: PagoService,
    private readonly notsService: NotsService,

  ){

  }


  async create(createServiciosAsignadoDto: CreateServiciosAsignadoDto, user_id: UUID) {
    try{
      const {pagoArchivo, id_departamento, id_servicio, ...rest} = createServiciosAsignadoDto;

      
      const departamento = await this.departamentoRepository.findOneBy({id: id_departamento});
      if(!departamento) {
        throw new InternalServerErrorException('Error fetching departamento');
      }
      const servicio = await this.servicioRepository.findOneBy({id: id_servicio});
      if(!servicio) {
        throw new InternalServerErrorException('Error fetching servicio');
      }

      let pago;
      if(pagoArchivo === null || pagoArchivo === undefined) {
        pago == null
      } else {
        pago = await this.pagoService.create(pagoArchivo, user_id);
        console.log(pago);
        if(!pago) {
          throw new InternalServerErrorException('Error creating pago');
        }
      }
      console.log("Pago")
      

      
      const serviciosAsignado = this.serviciosAsignadosRepository.create({
        ...rest,
        estado: ESTADO_ASIGNACION.ACTIVO,
        departamento,
        servicio,
        pago
      });

      if(!serviciosAsignado) {
        throw new InternalServerErrorException('Error creating serviciosAsignado');
      }

      await this.serviciosAsignadosRepository.save(serviciosAsignado);

      this.pagoService.updateEstadoAndFechas(pago.id, user_id);
      return serviciosAsignado;

    } catch (error) {
      this.handleError(error);
    }

  }
  async updatePago(idServicio: string, updatePagoArchivoDto: UpdatePagoArchivoDto) {

    console.log("updatePago", idServicio, updatePagoArchivoDto);
    try{
      const {pago, archivo} = updatePagoArchivoDto;
      const servicioAsignado = await this.serviciosAsignadosRepository.findOne({
        where: { id: idServicio },
        relations: ['pago', 'pago.archivo'],
      });
      if(!servicioAsignado) {
        throw new InternalServerErrorException('Error fetching servicioAsignado');
      }


      const pago1 = servicioAsignado.pago;
      const archivo1 = servicioAsignado.pago.archivo;
      if(!pago1 || !archivo1) {
        throw new InternalServerErrorException('Error fetching pago or archivo');
      }
      if(pago.estado === ESTADO_PAGO.PAGADO) {
        pago.fecha_pago = new Date();
      } else {
        pago.fecha_pago = null;
      }


      let archivoUpdated = {
        ...archivo1,
        ...archivo
      }

      await this.archivoRepository.save(archivoUpdated);
      let pagoUpdated = {
        ...pago1,
        ...pago
      }
      await this.pagoRepository.save(pagoUpdated);

      return pagoUpdated;

    } catch (error) {
      this.handleError(error);
    }
  }
  async updatePagoUser(idServicio: string, updatePagoArchivoDto: UpdatePagoArchivoDto) {

    console.log("updatePago", idServicio, updatePagoArchivoDto);
    try{
      const {pago, archivo} = updatePagoArchivoDto;
      const servicioAsignado = await this.serviciosAsignadosRepository.findOne({
        where: { id: idServicio },
        relations: ['pago', 'pago.archivo'],
      });
      if(!servicioAsignado) {
        throw new InternalServerErrorException('Error fetching servicioAsignado');
      }


      const pago1 = servicioAsignado.pago;
      const archivo1 = servicioAsignado.pago.archivo;
      if(!pago1 || !archivo1) {
        throw new InternalServerErrorException('Error fetching pago or archivo');
      }
      if(pago.estado === ESTADO_PAGO.PAGADO) {
        pago.fecha_pago = new Date();
      } else {
        pago.fecha_pago = null;
      }


      let archivoUpdated = {
        ...archivo1,
        ...archivo
      }

      await this.archivoRepository.save(archivoUpdated);
      let pagoUpdated = {
        ...pago1,
        ...pago
      }
      await this.pagoRepository.save(pagoUpdated);

      return pagoUpdated;

    } catch (error) {
      this.handleError(error);
    }
  }

  async updatePagoEstado(id: UUID) {
    try {
      const servicioAsignado = await this.serviciosAsignadosRepository.findOne({
        where: { id },
        relations: ['pago', 'servicio', 'pago.archivo'],
      });
      if(!servicioAsignado) {
        throw new InternalServerErrorException('Servicio asignado not found');
      }
      if(servicioAsignado.pago) {
        this.pagoService.updateEstadoAndFechas(servicioAsignado.pago.id as UUID, servicioAsignado.departamento?.user?.id);
      }
      return servicioAsignado;
    } catch (error) {
      this.handleError(error);
    }
  }


  async findAllPagos(id_user: UUID) {
    try {
      const pagables = await this.serviciosAsignadosRepository.find({
        relations: ['pago', 'pago.archivo', 'departamento', 'departamento.user', 'servicio'],
      });

      for(let i = 0; i < pagables.length; i++) {
        const pagotemp = {...pagables[i].pago}
        this.pagoService.updateEstadoAndFechas(pagables[i].pago.id as UUID, pagables[i].departamento?.user?.id);
        if (!this.deepEqual(pagotemp, pagables[i].pago)) {
          this.notsService.create({
            user_id: id_user,
            tipo: 'pago',
            titulo: 'Nuevo pago pendiente',
            descripcion: `El pago ${pagotemp.id + "," + pagables[i].servicio.descripcion} se ha actualizado a pendiente`,
          })
          pagables[i].pago = pagotemp;
        }
      }
      return pagables;



      
    } catch (error) {
      this.handleError(error);
    }
  }
  async findAllPagosUser(id_user: UUID) {
    try {
      const pagables = await this.serviciosAsignadosRepository.find({
        relations: ['pago', 'pago.archivo', 'departamento', 'departamento.user', 'servicio'],
        where: {
          departamento: {
            user: {
              id: id_user
            }
          }
        }
      });

      for(let i = 0; i < pagables.length; i++) {
        const pagotemp = {...pagables[i].pago}
        this.pagoService.updateEstadoAndFechas(pagables[i].pago.id as UUID, pagables[i].departamento?.user?.id);
        if (!this.deepEqual(pagotemp, pagables[i].pago)) {
          this.notsService.create({
            user_id: id_user,
            tipo: 'pago',
            titulo: 'Nuevo pago pendiente',
            descripcion: `El pago ${pagotemp.id + "," + pagables[i].servicio.descripcion} se ha actualizado a pendiente`,
          })
          pagables[i].pago = pagotemp;
        }
      }
      return pagables;



      
    } catch (error) {
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

  // findAll() {
  //   return `This action returns all serviciosAsignados`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} serviciosAsignado`;
  // }

  // update(id: number, updateServiciosAsignadoDto: UpdateServiciosAsignadoDto) {
  //   return `This action updates a #${id} serviciosAsignado`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} serviciosAsignado`;
  // }
}
