import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ESTADO_REPORTE, Reporte } from './entities/reporte.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { User } from '../auth/entities/user.entity';
import { ServiciosAsignado } from '../servicios-asignados/entities/servicios-asignado.entity';
import { NotsService } from '../nots/nots.service';

@Injectable()
export class ReportesService {
  
  constructor(
    @InjectRepository(Reporte)
    private reporteRepository: Repository<Reporte>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(ServiciosAsignado)
    private servicioAsignadoRepository: Repository<ServiciosAsignado>,
    
    private readonly notsService: NotsService
  ) {}

  async findAll(id: UUID) {
    try{
      const user = await this.userRepository.findOneBy({id: id});
      console.log(user)
      if(!user) {
        throw new InternalServerErrorException('Error getting user');
      }
      const reportes = await this.reporteRepository.find({
        relations: ['user', 'servicio_asignado', 'servicio_asignado.servicio'],
        where: {
          estado: ESTADO_REPORTE.PENDIENTE,
        }
      });
      if(!reportes) {
        throw new InternalServerErrorException('Error getting reports');
      }
      return reportes;
    } catch(error) {
      this.handleError(error);
    }
  }

  async markAsAttended(id_report: UUID) {
    try{
      const reporte = await this.reporteRepository.findOneBy({id: id_report});
      if(!reporte) {
        throw new InternalServerErrorException('Error getting report');
      }
      reporte.estado = ESTADO_REPORTE.ATENDIDO;
      const reporteAttended = await this.reporteRepository.save(reporte);
      
      return reporteAttended;
    } catch(error) {
      this.handleError(error);
    }
  }

  async attendReport(id_report: string) {
    try{
      const reporte = await this.reporteRepository.findOneBy({id: id_report});
      if(!reporte) {
        throw new InternalServerErrorException('Error getting report');
      }
      reporte.fecha_fin = new Date();
      const reporteAttended = await this.reporteRepository.save(reporte);
      if(!reporteAttended) {
        throw new InternalServerErrorException('Error attending report');
      }
      this.notsService.create({
        titulo: 'Reporte atendido',
        descripcion: 'El reporte ha sido atendido',
        user_id: reporte.user.id as UUID,
        tipo: 'reporte',
      })
      return reporteAttended;
    } catch(error) {
      this.handleError(error);
    }
  }
  

  async create(createReporteDto: CreateReporteDto, id_user: UUID, id_servicio: UUID = null) {
    try{
      const reporte = await this.reporteRepository.create(createReporteDto);
      if(!reporte) {
        throw new InternalServerErrorException('Error creating report');
      }
      const user = await this.userRepository.findOneBy({id: id_user})
      if(!user){
        throw new InternalServerErrorException('Error getting user');
      }
      reporte.user = user;
      if(id_servicio != null){
        const servicioAsignado = await this.servicioAsignadoRepository.findOneBy({
          id: id_servicio
        })
        if(!id_servicio){
          throw new InternalServerErrorException('Error getting servicio asignado');
        }
        reporte.servicio_asignado = servicioAsignado

      }
      return this.reporteRepository.save(reporte);

    } catch (error) {
      this.handleError(error);
    }
  }

  async findAllAdmin(){
    try{
      const reportes = await this.reporteRepository.find({
        relations: ['user', 'servicio_asignado', 'servicio_asignado.servicio']
      });
      if(!reportes) {
        throw new InternalServerErrorException('Error getting reports');
      }
      return reportes;
    } catch(error) {
      throw error
    }
  }


  // findOne(id: number) {
  //   return `This action returns a #${id} reporte`;
  // }

  // update(id: number, updateReporteDto: UpdateReporteDto) {
  //   return `This action updates a #${id} reporte`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} reporte`;
  // }

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
