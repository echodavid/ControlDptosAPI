import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ServicioResponse } from '../../../../../../common/interfaces/servicios.reponse';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'admin-servicio-panel',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './servicio.component.html',
  styleUrl: './servicio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicioPanelComponent { 
  @Input()
  servicio: ServicioResponse | null = null;
  
  @Output()
  public onDeleted: EventEmitter<ServicioResponse> = new EventEmitter();

  @Output()
  public onEdit: EventEmitter<ServicioResponse> = new EventEmitter();

  delete() {
    if (this.servicio) {
      this.onDeleted.emit(this.servicio);
    }
  }

  edit() {
    if (this.servicio) {
      this.onEdit.emit(this.servicio);
    }
  }

}
