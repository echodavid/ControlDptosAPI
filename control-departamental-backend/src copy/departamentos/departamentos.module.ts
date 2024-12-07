import { forwardRef, Module } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { DepartamentosController } from './departamentos.controller';
import { Departamento } from './entities/departamento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbicacionModule } from '../ubicacion/ubicacion.module';
import { AuthModule } from '../auth/auth.module';
import { ServiciosAsignadosModule } from '../servicios-asignados/servicios-asignados.module';
import { NotsModule } from '../nots/nots.module';
import { ServiciosModule } from '../servicios/servicios.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Departamento]),
    UbicacionModule,
    AuthModule,
    NotsModule,
    ServiciosModule,
    forwardRef(() => ServiciosAsignadosModule),

  ],
  controllers: [DepartamentosController],
  providers: [DepartamentosService],
  exports: [DepartamentosService, TypeOrmModule]
})
export class DepartamentosModule {}
