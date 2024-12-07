import { ChangeDetectionStrategy, Component, computed, EventEmitter, Inject, inject, Input, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReportePost } from '../../../../../common/interfaces/reporte.model';
import { DptoReponse, ServicioAsignacion } from '../../../../../common/interfaces/dpto.response';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reporte-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './reporte-add.component.html',
  styleUrl: './reporte-add.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReporteAddComponent {

  constructor(
    private dialogRef: MatDialogRef<ReporteAddComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {dptos: DptoReponse[]}
  ) { 
    console.log(this.dptos())
    
  }
  public dptos = computed(() => this.data.dptos);


  selectedServicio: ServicioAsignacion | null = null;
  selectedDpto: DptoReponse | null = null;
  public servicios: ServicioAsignacion[] = [];

  onDptoSelected(selected : DptoReponse) {
    console.log('Departamento seleccionado');
    this.servicios = selected.servicios || [];
    console.log(this.servicios);
  }
  onServicioSelected(servicio: ServicioAsignacion) {
    this.selectedServicio = servicio;
  }



  public onSubmit: EventEmitter<{ReportePost: ReportePost, id_servicio?: string}> = new EventEmitter();

  private fb = inject(FormBuilder);
  public addReporteForm = this.fb.group({
    descripcion: ['', Validators.required],
    isServicioRelated: [false],
    departamento: [''],
    servicio: [''],


  });

  isServicioRelated = this.addReporteForm.get("isServicioRelated")


  emitCredentials() {
    if(this.addReporteForm.valid){
      const reporte: ReportePost = {
        descripcion: this.addReporteForm.get('descripcion')?.value || '',
      }
      if(this.isServicioRelated && this.selectedServicio){
        const id = this.selectedServicio.id;
        this.onSubmit.emit({ReportePost: reporte, id_servicio: id });
        this.dialogRef.close({ReportePost: reporte, id_servicio: id });
      } else {
        this.onSubmit.emit({ReportePost: reporte});
        this.dialogRef.close({ReportePost: reporte});
      }
    }

  }

  onCancel() {
    this.dialogRef.close();
  }














  isControlTouched(controlName: string): boolean {
    return this.addReporteForm.get(controlName)?.touched || false;
  }
}
