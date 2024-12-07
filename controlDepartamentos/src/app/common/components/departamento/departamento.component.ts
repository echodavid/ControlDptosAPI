import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-departamento',
  standalone: true,
  imports: [
    CommonModule,
        MatListModule,
        MatCardModule
  ],
  templateUrl: './departamento.component.html',
  styleUrl: './departamento.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartamentoComponent {
  @Input() nombre: string = 'Name';
    @Input() description: string = 'Description';
    @Input() valor: number = 0;

}
