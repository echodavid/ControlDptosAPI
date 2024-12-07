import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { In, Repository } from 'typeorm';
import { UUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { VALID_ROLES } from '../auth/interfaces';


@Injectable()
export class UsersService {
  
  constructor(
    
    @InjectRepository(User)
    private userRepository: Repository<User>,

  ) {}

  async findAll() {
    console.log('entro');
    const role = [ VALID_ROLES.USER].map(role => String(role));

    const users = await this.userRepository.find({
      where: {
        rol: In(role),
      },
    });
    console.log(users);
    if (!users) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    return users;

  }

  async remove(id: UUID) {
    try{
      const user = await this.findOne(id);

      if(!user) {
        throw new InternalServerErrorException('Error deleting user');
      }

      await this.userRepository.remove(user);
      return user;
    } catch (error){
      this.handleError(error);
    }
  }
  
  async findOne(id: UUID) {
    const user = await this.userRepository.findOneBy({id: id});

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return user;

  }
  async update(userRe: User, updateUserDto: UpdateUserDto): Promise<User> {
    try{
      let user = await this.userRepository.findOneBy({ id: userRe.id });

      if (!user) {
        throw new UnauthorizedException('Credentials are not valid');
      }
      if(updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      Object.assign(user, updateUserDto);


      return this.userRepository.save(user); // Save the updated user entity
    
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
