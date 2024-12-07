import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { PagoItemComponent } from './components/pago-item/pago-item.component';
import { PagoPannelComponent } from './components/pago-pannel/pago-panel.component';
import { PagoArchivoPost } from '../../../../common/interfaces/dpto.response';
import { ServiciosAsignadosService } from '../../../../common/services/servicios-asignados.service';
import { ServicioAsignado } from '../../../../common/interfaces/servicioAsignado.respone';

@Component({
  selector: 'user-pagos',
  standalone: true,
  imports: [
    
    MatListModule,
    MatButtonModule,
    CommonModule,
    PagoItemComponent,
    PagoPannelComponent
  ],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagosComponent {
  constructor(
    private serviciosAsignadosService: ServiciosAsignadosService,
  ) {

  }

  public serviciosAsignados = computed(() => this.serviciosAsignadosService.serviciosAsignados());
  
  public servicioOpened = signal<ServicioAsignado | null>(null);


  ngOnInit() {
    this.serviciosAsignadosService.getServiciosAsignadosPagablesUser().subscribe({
      next: (response) => {
        console.log('Servicios fetched successfully[]', response);
      },
      error: (error) => {
        console.error('Error fetching servicios:', error);
      }
    });

  }

  public onUpdatePago(pago1: PagoArchivoPost) {
    console.log('Pago updated:', pago1);

    pago1.pago.fecha_pago = new Date(0);
    this.serviciosAsignadosService.updatePagoUser( pago1,this.servicioOpened()?.id).subscribe({
      next: (response) => {
        console.log('Pago updated successfully', response);
        this.serviciosAsignadosService.getServiciosAsignadosPagablesUser().subscribe({
          next: (response) => {
            const servicio = this.serviciosAsignados().find(servicio => servicio.id === this.servicioOpened()?.id);
            if(servicio){
              this.servicioOpened.set(servicio);
            }
            console.log('Servicios fetched successfully[]', response);
          },
          error: (error) => {
            console.error('Error fetching servicios:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error updating pago:', error);
      }
    });
  }
  onServicioclic(servicio: ServicioAsignado) {
    this.servicioOpened.set(servicio);
    console.log('Servicio clicked:', servicio);
  }
}
