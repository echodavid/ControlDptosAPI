import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUbicacionArchivoDto, CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';
import { CreateArchivoDto } from '../archivo/dto/create-archivo.dto';
import { Ubicacion } from './entities/ubicacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArchivoService } from '../archivo/archivo.service';
import { Archivo } from '../archivo/entities/archivo.entity';

@Injectable()
export class UbicacionService {
  constructor(
      @InjectRepository(Ubicacion)
      private ubicacionRepository: Repository<Ubicacion>,

      private readonly archivoService: ArchivoService,

      @InjectRepository(Archivo)
    private readonly archivoRepository: Repository<Archivo>,

    ) {
      
    }

  async create(createUbicacionArchivoDto: CreateUbicacionArchivoDto ) {
    try{

      const { archivo: archivoDto, ubicacion: ubicacionDto } = createUbicacionArchivoDto;

      const archivo = this.archivoRepository.create(archivoDto);
      await this.archivoRepository.save(archivo);


      console.log(archivo);

      if(!archivo) {
        throw new InternalServerErrorException('Error creating file');
      }

      const ubicacion = this.ubicacionRepository.create( {
        ...ubicacionDto,
        archivo: archivo,
      } );
      

      if(!ubicacion) {
        await this.archivoService.remove(archivo.id);
        throw new InternalServerErrorException('Error creating location');
      }
      ubicacion.archivo = archivo;

      await this.ubicacionRepository.save(ubicacion)
      return ubicacion;
    } catch (error) {
      this.handleError(error);
    }
  }
//   async create(createNotDto: CreateNotDto) {
    
//     try{

//       const { user_id, ...NotData} = createNotDto;
      
//       const userFound =  await this.usersService.findOne(user_id);
//       if(!userFound) {
//         throw new BadRequestException('User not found');
//       }
      

//       const not = this.notRepository.create( {
//         ...NotData,
//         user: userFound,
//       } );

//       await this.notRepository.save(not)

//       return not;

//     } catch (error) {
//       this.handleError(error);
//     }
// }

  // findAll() {
  //   return `This action returns all ubicacion`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} ubicacion`;
  // }

  // update(id: number, updateUbicacionDto: UpdateUbicacionDto) {
  //   return `This action updates a #${id} ubicacion`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} ubicacion`;
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
