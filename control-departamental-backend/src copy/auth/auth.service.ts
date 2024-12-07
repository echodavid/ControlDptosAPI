import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { VALID_ROLES } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly jwtService: JwtService,

  ) {}

  async create(createUserDto: CreateUserDto) {
    try{

      const { password, ...userData } = createUserDto;

      

      const user = this.userRepository.create({
        ...userData,
        password: await bcrypt.hash(password, 10),
        rol: createUserDto.rol,
      });

      await this.userRepository.save(user)
      delete user.password;

      return user;

    } catch (error) {
      this.handleError(error);
    }
  }

  async loginAdmin(loginUserDto: LoginUserDto) {
    return await this.validate(loginUserDto, VALID_ROLES.ADMIN);

  }

  async login(loginUserDto: LoginUserDto) {
    try {
      return await this.validate(loginUserDto, VALID_ROLES.USER);
    } catch (error) {
      throw this.handleError(error);
    }

  }


  async validate(loginUserDto: LoginUserDto, rol: VALID_ROLES) {
    try {
      const { email, password } = loginUserDto;

      const user = await this.userRepository.findOneBy({ email }
      );

      if (!user) {
        throw new UnauthorizedException('Credentials are not valid');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);


      if (!isPasswordValid) {
        throw new UnauthorizedException('Credentials are not valid');
      }

      if (!user.rol.includes(rol)) {
        throw new UnauthorizedException('Invalid rol');
      }

      const { password: _, ...userData } = user;

      return {
        user: userData,
        token: this.getJwtToken({ id: user.id }),
      };

    } catch (error) {
      this.handleError(error);
    }
  }


  async checkAuthStatus(user: User) {
    const { password: _, ...userData } = user;
    return {
      user: userData,
      token: this.getJwtToken({ id: user.id }),
    };

  }

  


  private getJwtToken( payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }



  private handleError(error: any) {
    if(error instanceof UnauthorizedException) {
      throw error;
    }
    if(error instanceof InternalServerErrorException) {
      throw new InternalServerErrorException(error.message)
    }
    if (error.code === '23505') {
      throw new Error('Email already exists');
    } else {
      throw new InternalServerErrorException(error.message)
    }


  }
}
