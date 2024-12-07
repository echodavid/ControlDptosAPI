import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateNotDto } from './dto/create-not.dto';
import { UpdateNotDto } from './dto/update-not.dto';
import { Notificacion } from './entities/not.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { User } from '../auth/entities/user.entity';
import { UUID } from 'crypto';

@Injectable()
export class NotsService {
  constructor(
    
    @InjectRepository(Notificacion)
    private notRepository: Repository<Notificacion>,

    private readonly usersService: UsersService,

    

  ) {
    
  }

  async create(createNotDto: CreateNotDto) {
    
      try{
  
        const { user_id, ...NotData} = createNotDto;
        
        const userFound =  await this.usersService.findOne(user_id);
        if(!userFound) {
          throw new BadRequestException('User not found');
        }
        
  
        const not = this.notRepository.create( {
          ...NotData,
          user: userFound,
        } );
  
        await this.notRepository.save(not)
  
        return not;
  
      } catch (error) {
        this.handleError(error);
      }
  }

  async findAll(user: User) {
    try {

      const notifications = await this.notRepository.find({
        where: { user: {id: user.id}, readed: false 
        
      },
        relations: ['user'],
        order: {
          fecha_creacion: 'DESC', // Ordenar por fecha de creación en orden descendente
        },
      });

      if (!notifications) {
        throw new BadRequestException('Not found');
      }
      
      return {
        data: notifications,
      };

    } catch (error) {
      this.handleError(error);
    }
  }

  async markAsReaded(user: User, id: UUID) {
    try {
      const notification = await this.notRepository.findOneBy(
        { id, user: {id: user.id} }
      );
      if (!notification) {
        throw new BadRequestException('Not found');
      }

      notification.readed = true;
      await this.notRepository.save(notification);

      return notification;

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
}
