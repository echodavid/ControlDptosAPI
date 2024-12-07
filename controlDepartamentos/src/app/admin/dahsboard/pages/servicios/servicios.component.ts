import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { ServiciosService } from '../../../../common/services/servicios.service';
import { ServicioResponse } from '../../../../common/interfaces/servicios.reponse';
import { ServicioPanelComponent } from "./components/servicio/servicio.component";
import { ServicioItemComponent } from "./components/servicioItem/servicioItem.component";
import { AddServiceComponent } from './components/addService/addService.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'admin-servicios',
  standalone: true,
  imports: [
    MatListModule,
    ServicioItemComponent,
    ServicioPanelComponent,
    CommonModule,
    MatButtonModule
],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiciosComponent {
  
  constructor(
    private serviciosService: ServiciosService,
    private dialog: MatDialog
  ) {
  }

  public servicios = computed(() => this.serviciosService.servicios());
  public servicioOpened = signal<ServicioResponse | null>(null);

  ngOnInit() {
    this.serviciosService.getServicios().subscribe({
      next: (response) => {
        console.log('Servicios fetched successfully', this.servicios());
      },
      error: (error) => {
        console.error('Error fetching servicios:', error);
      }
    });
  }

  onServicioClick(servicio: ServicioResponse) {
    this.servicioOpened.set(servicio);
    console.log('Servicio clicked:', servicio);
  }


  openAddServicioDialog() {
    const dialogRef = this.dialog.open(AddServiceComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica para agregar el nuevo servicio
        this.serviciosService.addServicio(result).subscribe({
          next: (response) => {
            console.log('Servicio added successfully', response);

          }
        });
      }
    });
  }
  public delete(servicio: ServicioResponse) {
    this.serviciosService.removeServicio(servicio).subscribe({
      next: (response) => {
        console.log('Servicio deleted successfully', response);
        this.servicioOpened.set(null);
      },
      error: (error) => {
        alert('Error al eliminar el servicio: ' + error.message);

      }
    });



  }

  public edit(servicio: ServicioResponse) {
  }

}
