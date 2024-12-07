import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ReportePanelComponent } from "./reporte-panel/reporte-panel.component";
import { ReporteItemComponent } from "./reporte-item/reporte-item.component";
import { ReportesService } from '../../../../common/services/reportes.service';
import { ReporteResponse } from '../../../../common/interfaces/reporte.model';
import { CommonModule } from '@angular/common';
import { ReporteAddComponent } from './reporte-add/reporte-add.component';
import { MatDialog } from '@angular/material/dialog';
import { DepartamentosService } from '../../../../common/services/departamentos.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    MatListModule,
    ReportePanelComponent,
    ReporteItemComponent,
    CommonModule,
    MatButtonModule
],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportesComponent {



  


  constructor(
    private reportesService: ReportesService,
    private dptosService: DepartamentosService,
    private dialog: MatDialog
  ){

  }

  public reportes = computed(() => this.reportesService.reportes());

  public reporteOpened = signal<ReporteResponse | null>(null);

  public dptos = computed(() => this.dptosService.departamentos());

  ngOnInit() {
    this.reportesService.getReportesUSer().subscribe({
      next: (response) => {
        console.log('Reportes fetched successfully', this.reportes());
      },
      error: (error) => {
        console.error('Error fetching reportes:', error);
      }
    });
    this.dptosService.getDepartamentosUser().subscribe({
      next: (response) => {
        console.log('Dptos fetched successfully', this.dptos());
      },
      error: (error) => {
        console.error('Error fetching dptos:', error);
      }
    });

  }

  onReporteClic(reporte: ReporteResponse) {
    this.reporteOpened.set(reporte);
  }

  openAddReporte() {
    console.log('Open add reporte dialog');


    const dialogRef = this.dialog.open(ReporteAddComponent, 
      {
        data: {
          dptos: this.dptos()
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed', result);
        // Lógica para agregar el nuevo servicio
        const id_servicio = result?.id_servicio ? result.id_servicio : '';

        this.reportesService.addReporte(result.ReportePost, id_servicio).subscribe({
          next: (response) => {
            console.log('Reporte added successfully', response);
            this.reportesService.getReportesUSer().subscribe({
              next: (response) => {
                console.log('Reportes fetched successfully', this.reportes());
              },
              error: (error) => {
                console.error('Error fetching reportes:', error);
              }
            });
          },
          error: (error) => {
            console.error('Error adding reporte:', error);
          }
        });
      }
    })
  }
  attend (event: ReporteResponse) {
    this.reportesService.markAsAttend(event).subscribe({
      next: (response) => {
        console.log('Reporte marked as attend', response);
        this.reporteOpened.set(null);
        this.reportesService.getReportesUSer().subscribe({
          next: (response) => {
            console.log('Reportes fetched successfully', this.reportes());
          },
          error: (error) => {
            console.error('Error fetching reportes:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error marking as attend:', error);
      }
    });
  }

  

}
