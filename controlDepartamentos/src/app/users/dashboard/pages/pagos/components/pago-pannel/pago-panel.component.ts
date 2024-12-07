import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ServicioAsignado } from '../../../../../../common/interfaces/servicioAsignado.respone';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ESTADO_PAGO, PagoArchivoPost, PagoPost } from '../../../../../../common/interfaces/dpto.response';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'user-pago-panel',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
    
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
      }
    }
  }
  onURLInput(): void {

      const response = {
        pago: this.updatePago.pago,
        archivo: this.updatePago.archivo
      }
      console.log(response);
      console.log(response);
      this.onPago.emit(response);  // Emite el evento para notificar al padre
    
  }

}
