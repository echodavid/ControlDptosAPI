import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ServicioAsignado } from '../../../../../../common/interfaces/servicioAsignado.respone';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ESTADO_PAGO, PagoArchivoPost, PagoPost } from '../../../../../../common/interfaces/dpto.response';

@Component({
  selector: 'admin-pago-panel',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './pago-pannel.component.html',
  styleUrl: './pago-pannel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagoPannelComponent {

  @Output()
  public onPago: EventEmitter<PagoArchivoPost> = new EventEmitter();

  @Input()
  servicio: ServicioAsignado | null = null;
  public ESTADO_PAGO = ESTADO_PAGO;

  updatePago:PagoArchivoPost = {
    pago: {
      periodicidad:      0,
      fecha_pago:       new Date(),
      fecha_pagar:        new Date(),
      fecha_vencimiento:  new Date(),
      estado:            ESTADO_PAGO.PENDIENTE,
    },
    archivo: {
      tipo: '',
      url: ''
    }

  }
  ngOnChanges() {
    if(this.servicio?.pago){
      this.updatePago.pago = {
        periodicidad: this.servicio.pago.periodicidad,
        fecha_pago: this.servicio.pago.fecha_pago,
        fecha_pagar: this.servicio.pago.fecha_pagar,
        fecha_vencimiento: this.servicio.pago.fecha_vencimiento,
        estado: this.servicio.pago.estado
      };
      this.updatePago.archivo = {
        tipo: this.servicio.pago.archivo.tipo,
        url: this.servicio.pago.archivo.url
      };
    }
  }
  onEstadoSelect(event: ESTADO_PAGO): void {

      const body = {
        pago: this.updatePago.pago,
        archivo: this.updatePago.archivo
      }
      console.log(body);
      if(event === ESTADO_PAGO.PAGADO){
        body.pago.fecha_pago = new Date().toISOString().split('T')[0] as unknown as Date; // Formato YYYY-MM-DD
      } else {
        body.pago.fecha_pago = new Date(0); // Definir la fecha como 0000/00/00
      }
      console.log(body);
      this.onPago.emit(body);  // Emite el evento para notificar al padre
    
  }

}
