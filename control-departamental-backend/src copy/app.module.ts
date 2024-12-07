import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotsModule } from './nots/nots.module';
import { ServiciosModule } from './servicios/servicios.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { ArchivoModule } from './archivo/archivo.module';
import { PagoModule } from './pago/pago.module';
import { ServiciosAsignadosModule } from './servicios-asignados/servicios-asignados.module';
import { ReportesModule } from './reportes/reportes.module';
import { EstadisticasModule } from './estadisticas/estadisticas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    NotsModule,
    ServiciosModule,
    DepartamentosModule,
    UbicacionModule,
    ArchivoModule,
    PagoModule,
    ServiciosAsignadosModule,
    ReportesModule,
    EstadisticasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
