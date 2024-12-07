import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'user-pago-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    CommonModule
  ],
  templateUrl: './pago-item.component.html',
  styleUrl: './pago-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagoItemComponent {
  @Input() estado: string | undefined = 'pagado';
  @Input() srvNombre: string = 'Name';
  @Input() dptoNombre: string = 'Dpto';
  @Input() fechaPagar: Date | undefined = new Date();
}
