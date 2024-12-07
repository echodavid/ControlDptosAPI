import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DptoReponse } from '../../../../../common/interfaces/dpto.response';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'dpto-list-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule
],
  templateUrl: './DptoList.component.html',
  styleUrl: './DptoList.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DptoListItemComponent {
[x: string]: any;

  @Input()
    departamento: DptoReponse|null = null;
  

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
