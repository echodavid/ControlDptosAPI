import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

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
        username: 'admin',
        password: 'admin', // Asegúrate de hashear la contraseña en un entorno real
        email: 'admin@example.com',
        isActive: true,
      });
      await this.userRepository.save(initialUser);
      console.log('Initial user created');
    }
  }
}