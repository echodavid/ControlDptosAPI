import { Module } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { UbicacionController } from './ubicacion.controller';
import { Ubicacion } from './entities/ubicacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ArchivoModule } from '../archivo/archivo.module';
import { Archivo } from '../archivo/entities/archivo.entity';

@Module({
  controllers: [UbicacionController],
  imports: [ 
    AuthModule,
    TypeOrmModule.forFeature([Ubicacion, Archivo]),
    ArchivoModule
  ],
  providers: [UbicacionService],
  exports: [UbicacionService, TypeOrmModule]
})
export class UbicacionModule {}
