import { Module } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { EstadisticasController } from './estadisticas.controller';
import { AuthModule } from '../auth/auth.module';
import { DepartamentosModule } from '../departamentos/departamentos.module';
import { UsersModule } from '../users/users.module';
import { ReportesService } from '../reportes/reportes.service';
import { ReportesModule } from '../reportes/reportes.module';
import { PagoModule } from '../pago/pago.module';
import { ServiciosAsignadosModule } from '../servicios-asignados/servicios-asignados.module';

@Module({
  controllers: [EstadisticasController],
  providers: [EstadisticasService],
  imports: [
    AuthModule,
    DepartamentosModule,
    UsersModule,
    ReportesModule,
    PagoModule,
    ServiciosAsignadosModule
  ]
})
export class EstadisticasModule {}
