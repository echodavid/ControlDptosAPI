import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'user-reporte-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    CommonModule
  ],
  templateUrl: './reporte-item.component.html',
  styleUrl: './reporte-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReporteItemComponent {



  @Input() fecha_inicio: Date = new Date();
  @Input() fecha_fin: Date|null = new Date(0);
  @Input() descripcion: string = '';


  getEstadoClass(): string {
    if (this.fecha_fin && this.fecha_fin.getTime() > 0) {
      return 'atendido'; // Si la propiedad 'pago' es 'true', se aplica clase
    }
    return 'pendiente'; // Si no existe la propiedad 'pago', no se aplica clase
  }

}
