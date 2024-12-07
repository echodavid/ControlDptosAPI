import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'admin-servicio-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule
  ],
  templateUrl: './servicioItem.component.html',
  styleUrl: './servicioItem.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicioItemComponent {
  @Input() title: string = 'Title';
  @Input() estado: string = 'Estado';
}
