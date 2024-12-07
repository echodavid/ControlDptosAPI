import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { DepartamentosService } from '../../../../common/services/departamentos.service';
import { MatDialog } from '@angular/material/dialog';
import { DptoReponse, ServiciosAsignadoPost, ServicioServicio } from '../../../../common/interfaces/dpto.response';
import { DepartamentoItemComponent } from "./components/departamento-item/departamento-item.component";
import { DepartamentoPanelComponent, UserSelectEvent } from "./components/departamento-panel/departamento-panel.component";
import { UserService } from '../../../../common/services/user.service';
import { UserResponse } from '../../../../common/interfaces';
import { AddDepartamentoComponent } from './components/add-departamento/add-departamento.component';
import { MatButtonModule } from '@angular/material/button';
import { ServiciosService } from '../../../../common/services/servicios.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dptos',
    standalone: true,
    imports: [
    CommonModule,
    MatListModule,
    DepartamentoItemComponent,
    DepartamentoPanelComponent,
    MatButtonModule
],
    templateUrl: './dptos.component.html',
    styleUrl: './dptos.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DptosComponent  {
    
  constructor(
    private dptosService: DepartamentosService,
    private usersService: UserService,
    private servicioService: ServiciosService,
    private dialog: MatDialog
  ) {
  }

  public dptos = computed(() => this.dptosService.departamentos());

  public users = computed(() => this.usersService.users());
  
  public dptoOpened = signal<DptoReponse | null>(null);

  public servicios = computed(() => this.servicioService.servicios());

  ngOnInit() {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        console.log('Users fetched successfully[]', this.users());
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });

    this.dptosService.getDepartamentos().subscribe({
      next: (response) => {
        console.log('Dptos fetched successfully', this.dptos());
      },
      error: (error) => {
        console.error('Error fetching dptos:', error);
      }
    });

    this.servicioService.getServicios().subscribe({
      next: (response) => {
        console.log('Servicios fetched successfully', this.servicios());
      },
      error: (error) => {
        console.error('Error fetching servicios:', error);
      }
    });

  }

  onDptoClic(dpto: DptoReponse) {
    this.dptoOpened.set(dpto);
    console.log('Dpto clicked:', dpto);
  }


  openAddDpto() {
    const dialogRef = this.dialog.open(AddDepartamentoComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed', result);
        // Lógica para agregar el nuevo servicio
        this.dptosService.addDepartamento(result).subscribe({
          next: (response) => {
            console.log('Dpto added successfully', response);
            this.dptosService.getDepartamentos().subscribe({
              next: (response) => {
                console.log('Dptos fetched successfully', this.dptos());
              },
              error: (error) => {
                console.error('Error fetching dptos:', error);
              }
            });
            this.dptosService
          }
        });
      }
    });
  }
  public delete(dpto: DptoReponse) {
    this.dptosService.removeDpto(dpto).subscribe({
      next: (response) => {
        console.log('Dpto deleted successfully', response);
        this.dptoOpened.set(null);
      },
      error: (error) => {
        Swal.fire(
          'Error!',
          "Error al eliminar",
          'error'
        )

      }
    });



  }

  public postService(servicio: ServiciosAsignadoPost) {
    this.dptosService.addServicio(servicio).subscribe({
      next: (response) => {
        console.log('Dpto added successfully', response);
        this.dptosService.getDepartamentos().subscribe({
          next: (response) => {
            console.log('Dptos fetched successfully', this.dptos());
            this.dptoOpened.set(this.dptos().filter(dpto => dpto.id === this.dptoOpened()?.id)[0]);
          },
          error: (error) => {
            console.error('Error fetching dptos:', error);
          }
        });
        this.dptosService
      },
      error: (error) => {
        Swal.fire(
          'Error!',
          "Error al asignar el servico " + error.message,
          'error'
        )
      }
    });
  }


  public edit(dpto: DptoReponse) {
  }

  public onUserSelect(event: UserSelectEvent) {
    this.dptosService.asignarUserDpto( event.departamento, event.event).subscribe({
      next: (response) => {
        console.log('User assigned successfully', response);
      },
      error: (error) => {
        Swal.fire(
          'Error!',
          "Error al asignar el usuario " + error.message,
          'error'
        )
      }
    });
  }
  
}
