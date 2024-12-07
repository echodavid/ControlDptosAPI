import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, OnInit, signal } from '@angular/core';
import { DepartamentosService } from '../../../../common/services/departamentos.service';
import { DptoReponse, ServicioAsignacion, Ubicacion } from '../../../../common/interfaces/dpto.response';
import { DepartamentoComponent } from "../../../../common/components/departamento/departamento.component";
import { MatListModule } from '@angular/material/list';
import { DptoListItemComponent } from "./DptoList/DptoList.component";

@Component({
    selector: 'app-dptos',
    standalone: true,
    imports: [
    CommonModule,
    DepartamentoComponent,
    MatListModule,
    DptoListItemComponent,
],
    templateUrl: './dptos.component.html',
    styleUrls: ['./dptos.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DptosComponent implements OnInit {

  public dptos = computed(() => this.dptosService.departamentos());
  public dptoOpened = signal<DptoReponse | null>(null);
  public ubicacionOpened = signal<boolean>(false);
  public serviciosOpened = signal<ServicioAsignacion|null>(null);
  public generalOpened = signal<boolean>(false);

  onUbicacionClick() {
    this.ubicacionOpened.set(true);
  }

  constructor(private dptosService: DepartamentosService) {}

  ngOnInit() {
    this.dptosService.getDepartamentosUser().subscribe({
      next: (response) => {
        console.log('Dptos fetched successfully', response);
      },
      error: (error) => {
        
        console.error('Error fetching dptos:', error);
      }
    });
  }

  onDptoClick(dpto: DptoReponse) {
    this.dptoOpened.set(dpto);
    console.log('Dpto clicked:', dpto);
    
  }

}
