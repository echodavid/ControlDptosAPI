import { Module } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { ArchivoController } from './archivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archivo } from './entities/archivo.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ArchivoController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Archivo])
],
  providers: [ArchivoService],
  exports: [ArchivoService, TypeOrmModule]
})
export class ArchivoModule {}
