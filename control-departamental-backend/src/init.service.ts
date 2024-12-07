import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth/entities/user.entity';
import { VALID_ROLES } from './auth/interfaces';

@Injectable()
export class InitService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const userCount = await this.userRepository.count();
    if (userCount === 0) {
      const initialUser = this.userRepository.create({
        nombre: 'admin',
        apellido: 'admin',
        rol: VALID_ROLES.ADMIN,
        password: 'Admin02', // Asegúrate de hashear la contraseña en un entorno real
        email: 'admin@example.com',
        isActive: true,
      });
      await this.userRepository.save(initialUser);
      console.log('Initial user created');
    }
  }
}