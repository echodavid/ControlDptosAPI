import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Servicio } from './entities/servicio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>
  ) {}

  async create(createServicioDto: CreateServicioDto) {
    try{

      const servicio = await this.servicioRepository.create(createServicioDto);

      if(!servicio) {
        throw new InternalServerErrorException('Error creating servicio');
      }


      await this.servicioRepository.save(servicio);

      return servicio;

    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll() {
    try {
      const servicios = await this.servicioRepository.find();
      if(!servicios) {
        throw new InternalServerErrorException('Error fetching servicios');
      }
      return servicios;
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: UUID) {
    try {
      const servicio = await this.servicioRepository.findOneBy({id});
      if(!servicio) {
        throw new InternalServerErrorException('Error fetching servicio');
      }
      await this.servicioRepository.remove(servicio);
      return servicio;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: UUID, updateServicioDto: UpdateServicioDto) {
    try {
      let servicio = await this.servicioRepository.findOneBy({id});
      if(!servicio) {
        throw new InternalServerErrorException('Error fetching servicio');
      }
      servicio = {
        ...servicio,
        ...updateServicioDto
      }
      await this.servicioRepository.save(servicio);
      return servicio;
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
    if (error.code === '23505') {
      throw new Error('Email already exists');
    } else {
      throw new InternalServerErrorException(error.message);
    }


  }

  // findAll() {
  //   return `This action returns all servicios`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} servicio`;
  // }

  // update(id: number, updateServicioDto: UpdateServicioDto) {
  //   return `This action updates a #${id} servicio`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} servicio`;
  // }
}
