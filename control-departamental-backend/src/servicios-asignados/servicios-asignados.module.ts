import { forwardRef, Module } from '@nestjs/common';
import { ServiciosAsignadosService } from './servicios-asignados.service';
import { ServiciosAsignadosController } from './servicios-asignados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosAsignado } from './entities/servicios-asignado.entity';
import { PagoModule } from '../pago/pago.module';
import { Departamento } from '../departamentos/entities/departamento.entity';
import { DepartamentosModule } from '../departamentos/departamentos.module';
import { ServiciosModule } from '../servicios/servicios.module';
import { AuthModule } from '../auth/auth.module';
import { NotsModule } from '../nots/nots.module';
import { ArchivoModule } from '../archivo/archivo.module';

@Module({
  controllers: [ServiciosAsignadosController],
  providers: [ServiciosAsignadosService],
  imports: [
    TypeOrmModule.forFeature([
      ServiciosAsignado,
      Departamento
    ]),
    forwardRef(() => DepartamentosModule),
    forwardRef(() => PagoModule),
    NotsModule,
    ArchivoModule,

    ServiciosModule,
    AuthModule

  ],

  exports: [ServiciosAsignadosService, TypeOrmModule]
})
export class ServiciosAsignadosModule {}
