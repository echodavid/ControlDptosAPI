import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { Reporte } from './entities/reporte.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ServiciosAsignado } from '../servicios-asignados/entities/servicios-asignado.entity';
import { NotsModule } from '../nots/nots.module';

@Module({
  controllers: [ReportesController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Reporte,ServiciosAsignado]),
    NotsModule
  ],

  providers: [ReportesService],

  exports: [ReportesService, TypeOrmModule]
})
export class ReportesModule {}
