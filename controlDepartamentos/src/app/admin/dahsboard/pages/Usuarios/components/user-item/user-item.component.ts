import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'admin-user-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule
  ],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserItemComponent {
  @Input() nombre: string = 'Name';
  @Input() apellido: string = 'Surname';
  @Input() email: string = 'Email';
  @Input() telefono: string = 'Telephone';

}
