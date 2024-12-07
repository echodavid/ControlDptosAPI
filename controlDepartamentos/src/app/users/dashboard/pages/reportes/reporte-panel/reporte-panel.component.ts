import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReporteResponse } from '../../../../../common/interfaces/reporte.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user-reporte-panel',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './reporte-panel.component.html',
  styleUrl: './reporte-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportePanelComponent {

  @Input() reporte!: ReporteResponse;

  @Output() onAttend = new EventEmitter<ReporteResponse>();

  markAsAttend(){
    if(this.reporte){
      this.onAttend.emit(this.reporte);
    }
  }

}
