import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DptoReponse, ESTADO_PAGO, PagoArchivoPost, ServiciosAsignadoPost } from '../../../../../../common/interfaces/dpto.response';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { UserResponse } from '../../../../../../common/interfaces';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ServicioResponse } from '../../../../../../common/interfaces/servicios.reponse';


@Component({
  selector: 'admin-departamento-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatNativeDateModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatCheckboxModule,
    MatOptionModule

    
  ],
  providers: [
  ],
  templateUrl: './departamento-panel.component.html',
  styleUrl: './departamento-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DepartamentoPanelComponent implements OnInit, OnChanges {
shouldHighlight(dpto: DptoReponse): any {
  const currentYear = new Date().getFullYear();
  const creationYear = new Date(dpto.fecha_creacion).getFullYear();
  // const yearDifference = currentYear - creationYear;
  const yearDifference = 2;
  const valoracion = dpto.valoracion; // Suponiendo que tienes esta propiedad
  
  return (yearDifference * 0.8 * valoracion) > (0.15 * valoracion);
}
  @Input()
  departamento: DptoReponse | null = null;

  public ESTADO_PAGO = ESTADO_PAGO

  @Input()
  users: UserResponse[] = [];

  @Input()
  servicios: ServicioResponse[] = [];
  
  @Output()
  public onDeleted: EventEmitter<DptoReponse> = new EventEmitter();

  @Output()
  public onEdit: EventEmitter<DptoReponse> = new EventEmitter();

  @Output()
  public onServicePost: EventEmitter<ServiciosAsignadoPost> = new EventEmitter();
  
  delete() {
    if (this.departamento) {
      this.onDeleted.emit(this.departamento);
    }
  }
  @Output()
  public onUser: EventEmitter<UserSelectEvent> = new EventEmitter();


  selectedServicio: ServicioResponse | null = null;
  isPagoAdded: boolean = false;
  newPago: PagoArchivoPost = {
    pago: {
      periodicidad: 0,
      fecha_pago: new Date(),
      fecha_pagar: new Date(),
      fecha_vencimiento: new Date(),
      estado: ESTADO_PAGO.PENDIENTE

    },
    archivo: {
      tipo: '',
      url: ''
    }
  };
  onServicioSelect(servicio: ServicioResponse) {
    this.selectedServicio = servicio;
  }
  addServicio() {
    if (this.selectedServicio) {
      const servicioData: ServiciosAsignadoPost = {
        id_departamento: this.departamento?.id || '',
        encargado: 'admin',
        id_servicio: this.selectedServicio.id,
      };

      if (this.isPagoAdded) {
        console.log(this.isPagoAdded)
        servicioData.pagoArchivo= {
          pago: {
            periodicidad: +this.newPago.pago.periodicidad,
            fecha_pago: this.newPago.pago.fecha_pago,
            fecha_pagar: this.newPago.pago.fecha_pagar,
            fecha_vencimiento: this.newPago.pago.fecha_vencimiento,
            estado: this.newPago.pago.estado
          },
          archivo: {
            tipo: 'pago',
            url: this.newPago.archivo.tipo
          } 
        }
      }
      this.onServicePost.emit(servicioData);
      this.servicios.filter(
        servicio => servicio.id != this.selectedServicio?.id

      )
      alert('Servicio asignado correctamente');
    }
  }


  constructor(private fb: FormBuilder) { }

  selectedUser: UserResponse =  {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    id: '',
    password: '',
    rol: '',
    fecha_creacion: new Date(),
    isActive: false
  }; // Aquí almacenamos al usuario seleccionado
  
    ngOnInit(): void {
      // Inicializa el usuario seleccionado con el usuario del departamento
      this.selectedUser = this.departamento?.user || {
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        id: '',
        password: '',
        rol: '',
        fecha_creacion: new Date(),
        isActive: false
      };
      console.log("users", this.users);
      if (this.departamento?.servicios) {
        const servicioIds = this.departamento.servicios.map(servicio => servicio.id);
        this.servicios = this.servicios.filter(servicio => !servicioIds.includes(servicio.id));
      }
    }

    ngOnChanges(changes: SimpleChanges): void {
      // Si cambia 'departamento', actualizamos selectedUser
      if (changes['departamento']) {
        this.selectedUser = this.departamento?.user || {
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          id: '',
          password: '',
          rol: '',
          fecha_creacion: new Date(),
          isActive: false
        };
      }
    }
  // Este método se llama cuando se selecciona un usuario de la lista
  onUserSelect(event: UserResponse): void {
    this.selectedUser = event;  // Asigna el usuario seleccionado
    if (this.departamento) {
      const response: UserSelectEvent = {
        departamento: this.departamento,
        event
      };
      this.onUser.emit(response);  // Emite el evento para notificar al padre
    }
  }





  getEstadoClass(servicio: any): string {
    if (servicio.pago) {
      const estado = servicio.pago.estado.toLowerCase(); // Asegúrate de que el estado esté en minúsculas si es necesario
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

}
export interface UserSelectEvent {
  departamento: DptoReponse ;
  event: UserResponse;
}