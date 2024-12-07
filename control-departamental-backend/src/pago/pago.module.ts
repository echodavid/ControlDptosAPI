import { forwardRef, Module } from '@nestjs/common';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Archivo } from '../archivo/entities/archivo.entity';
import { AuthModule } from '../auth/auth.module';
import { NotsModule } from '../nots/nots.module';
import { ServiciosAsignadosModule } from '../servicios-asignados/servicios-asignados.module';

@Module({
  controllers: [PagoController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Pago, Archivo]),
    NotsModule,
    forwardRef(() => ServiciosAsignadosModule),
  ],
  providers: [PagoService],
  exports: [PagoService, TypeOrmModule]
})
export class PagoModule {}
