import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { EstadisticasService } from '../../../../common/services/estadisticas.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstadisticasComponent {

  constructor(
    private estadisticasService: EstadisticasService,

  ){

  }

  public estadisticas = computed(() => this.estadisticasService.estadisticasAdmin());

  ngOnInit(){
    this.estadisticasService.getEstadisticasAdmin().subscribe({
      next: (response) => {
        console.log('Estadisticas fetched successfully', this.estadisticas());
      },
      error: (error) => {
        console.error('Error fetching estadisticas:', error);
      }
    });
  }

 }
