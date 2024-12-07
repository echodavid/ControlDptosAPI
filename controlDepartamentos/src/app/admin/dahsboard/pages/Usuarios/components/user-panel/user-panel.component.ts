import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UserResponse } from '../../../../../../common/interfaces';
import { MatCardModule } from '@angular/material/card';
import { MatList, MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'admin-user-panel',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPanelComponent {
  @Input()
  user: UserResponse | null = null;

  
  @Output()
  public onDeleted: EventEmitter<UserResponse> = new EventEmitter();

  delete() {
    if (this.user) {
      this.onDeleted.emit(this.user);
    }
  }



  constructor() { }





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
