import { Injectable } from '@nestjs/common';
import { CreateEstadisticaDto } from './dto/create-estadistica.dto';
import { UpdateEstadisticaDto } from './dto/update-estadistica.dto';
import { DepartamentosService } from '../departamentos/departamentos.service';
import { UsersService } from '../users/users.service';
import { ReportesService } from '../reportes/reportes.service';
import { UUID } from 'crypto';
import { ESTADO_REPORTE } from '../reportes/entities/reporte.entity';
import { PagoService } from '../pago/pago.service';
import { ESTADO_PAGO } from '../pago/entities/pago.entity';
import { ServiciosAsignadosService } from '../servicios-asignados/servicios-asignados.service';

@Injectable()
export class EstadisticasService {
  constructor(

    private readonly departamentoService: DepartamentosService,
    private readonly usersService: UsersService,
    private readonly reportesService: ReportesService,
    private readonly pagoService: PagoService,
    private readonly serviciosAsignadosService: ServiciosAsignadosService



  ) {}

  async findAllUser(id_user: UUID) {
    console.log("Asdasdasdasd")
    try{
      const departamentos = await this.departamentoService.findOneByUser(id_user)

      const reportes = await this.reportesService.findAll(id_user);

      const pagos = await this.serviciosAsignadosService.findAllPagosUser(id_user);

      const dptosAsignados = departamentos.length;
      const reportesTotales = reportes.length;
      const reportesAtentidos = reportes.filter(r => r.estado === ESTADO_REPORTE.ATENDIDO).length;
      const reportesPendientes = reportes.filter(r => r.estado === ESTADO_REPORTE.PENDIENTE).length;

      const pagosTotales = pagos.length;
      const pagosPendientes = pagos.filter(p => p.pago.estado === ESTADO_PAGO.PENDIENTE).length;
      const pagosPagados = pagos.filter(p => p.pago.estado === ESTADO_PAGO.PAGADO).length;


      return {
            dptosAsignados,
          reportesTotales,
          reportesAtentidos,
          reportesPendientes,
          pagosTotales,
          pagosPendientes,
          pagosPagados
        
      }

    } catch (error ){
      throw error;
    }


  }

  async findAll(id_user: UUID) {
    try {
      const departamentos = await this.departamentoService.findAll(id_user)

      const users = await this.usersService.findAll();
      const reportes = await this.reportesService.findAllAdmin();

      const pagos = await this.pagoService.findAll();


      const dptosOcupados = departamentos.filter(dpto => dpto?.user).length;
      const dptosDisponibles = departamentos.filter(dpto => !dpto?.user).length;
      const dptosTotal = departamentos.length;

      const usersTotal = users.length;

      const reportesPendientes = reportes.filter(r => r.estado === ESTADO_REPORTE.PENDIENTE).length;
      const reportesAtendidos = reportes.filter(r => r.estado === ESTADO_REPORTE.ATENDIDO).length;
      const reportesTotal = reportes.length;

      const pagosTotal = pagos.length;
      const pagosPendientes = pagos.filter(p => p.estado == ESTADO_PAGO.PENDIENTE).length;
      const pagosPagados = pagos.filter(p => p.estado == ESTADO_PAGO.PAGADO).length


      return {
          dptosOcupados,
          dptosDisponibles,
          dptosTotal,
          usersTotal,
          reportesPendientes,
          reportesAtendidos,
          reportesTotal,
          pagosTotal,
          pagosPendientes,
          pagosPagados
        
      }
    } catch (error) {
      throw error;
    }
  }


}
