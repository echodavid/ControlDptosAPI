import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';
import { Archivo } from './entities/archivo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';

@Injectable()
export class ArchivoService {
  
  constructor(
    
    
    @InjectRepository(Archivo)
    private archivoRepository: Repository<Archivo>

  ) {
    
  }


  async create(createArchivoDto: CreateArchivoDto) {
    try{
        
        const archivo = this.archivoRepository.create( createArchivoDto );
  
        await this.archivoRepository.save(archivo)
  
        return archivo;
    } catch (error) {
      this.handleError(error);
    }
  }
  
  async update(id: UUID, updateArchivoDto: UpdateArchivoDto) {
    try {

      const archivo = await this.archivoRepository.preload({
        id: id,
        ...updateArchivoDto,
      });
      return this.archivoRepository.save(archivo);
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try{
      const archivo = await this.archivoRepository.findOneBy({id: id});
      if(!archivo) {
        throw new InternalServerErrorException('File not found');
      }
      await this.archivoRepository.remove(archivo);
    } catch (error) {
      this.handleError(error);
    }
  }

  // findAll() {
  //   return `This action returns all archivo`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} archivo`;
  // }

  // update(id: number, updateArchivoDto: UpdateArchivoDto) {
  //   return `This action updates a #${id} archivo`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} archivo`;
  // }

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
