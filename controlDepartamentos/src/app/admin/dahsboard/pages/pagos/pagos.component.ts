import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ServiciosAsignadosService } from '../../../../common/services/servicios-asignados.service';
import { Pago, ServicioAsignado } from '../../../../common/interfaces/servicioAsignado.respone';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PagoItemComponent } from './components/pago-item/pago-item.component';
import { PagoPannelComponent } from './components/pago-pannel/pago-panel.component';
import { PagoArchivoPost } from '../../../../common/interfaces/dpto.response';

@Component({
  selector: 'app-pagos',
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
  ){

  }

  public serviciosAsignados = computed(() => this.serviciosAsignadosService.serviciosAsignados());

  public servicioOpened = signal<ServicioAsignado | null>(null);

  ngOnInit() {
    this.serviciosAsignadosService.getServiciosAsignadosPagables().subscribe({
      next: (response) => {
        console.log('Servicios fetched successfully[]', response);
      },
      error: (error) => {
        console.error('Error fetching servicios:', error);
      }
    });

  }

  onServicioclic(servicio: ServicioAsignado) {
    this.servicioOpened.set(servicio);
    console.log('Servicio clicked:', servicio);
  }
  getEstadoClass(status: string | undefined ): string {
    if (status) {
      const estado = status.toLowerCase(); // Asegúrate de que el estado esté en minúsculas si es necesario
      switch (estado) {
        case 'pagado':
          return 'pagado';  // Clase CSS para el estado 'pagado'
        case 'pendiente':
          return 'pendiente'; // Clase CSS para el estado 'pendiente'
        case 'vencido':
          return 'vencido'; // Clase CSS para el estado 'vencido'
        default:
          return ''; // Sin clase si el estado no coincide con los anteriores
      }
    }
    return ''; // Si no existe la propiedad 'pago', no se aplica clase
  }
  public onUpdatePago(pago1: PagoArchivoPost){
    console.log('Pago updated:', pago1);

    this.serviciosAsignadosService.updatePago( pago1,this.servicioOpened()?.id).subscribe({
      next: (response) => {
        console.log('Pago updated successfully', response);
        this.serviciosAsignadosService.getServiciosAsignadosPagables().subscribe({
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


}
