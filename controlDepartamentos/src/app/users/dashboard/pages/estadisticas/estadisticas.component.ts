import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { EstadisticasService } from '../../../../common/services/estadisticas.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule
  ],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstadisticasComponent {
  constructor(
    private estadisticasService: EstadisticasService
  ) {}

  public estadisticas = computed(() => this.estadisticasService.estadisticas())

  ngOnInit(){
    this.estadisticasService.getEstadisticasUser().subscribe({
      next: (response) => {
        console.log('Estadisticas fetched successfully', this.estadisticas());
      },
      error: (error) => {
        console.error('Error fetching estadisticas:', error);
      }
    });
  }

}
