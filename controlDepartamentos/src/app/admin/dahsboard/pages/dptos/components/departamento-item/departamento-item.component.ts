import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'admin-departamento-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule
  ],
  templateUrl: './departamento-item.component.html',
  styleUrl: './departamento-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartamentoItemComponent  {
  @Input() nombre: string = 'Name';
    @Input() description: string = 'Description';
    @Input() valor: number = 0;
}
