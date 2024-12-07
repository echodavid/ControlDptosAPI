import { Module } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { Servicio } from './entities/servicio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ServiciosController],
  imports: [
    TypeOrmModule.forFeature([Servicio]),
    AuthModule
  ],
  providers: [ServiciosService],
  exports: [ServiciosService, TypeOrmModule]
})
export class ServiciosModule {}
