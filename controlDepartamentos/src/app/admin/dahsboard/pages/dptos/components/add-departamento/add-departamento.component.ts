import { ChangeDetectionStrategy, Component, EventEmitter, inject } from '@angular/core';
import { DptoPost, DptoReponse } from '../../../../../../common/interfaces/dpto.response';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-add-departamento',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule, 
    CommonModule
  ],
  templateUrl: './add-departamento.component.html',
  styleUrl: './add-departamento.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDepartamentoComponent {

  
  private fb = inject(FormBuilder);
  public addDptoForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    valoracion: ['', Validators.required],
    habitaciones: [null, [Validators.required, Validators.min(1)]], // Iniciar con null o un valor que pase la validación
    banos: [null, [Validators.required, Validators.min(1)]],  // Iniciar con null o un valor que pase la validación
    fecha_construccion: ['', Validators.required],
    cod_postal: ['', [Validators.required]],
    estado_ubicacion: ['', [Validators.required]],
    municipio: ['', [Validators.required]],
    colonia: ['', [Validators.required]],
    calle: ['', [Validators.required]],
    num_ext: ['', [Validators.required]],
    num_int: [''],
    referencia: [''],
    url: ['']
  });
  constructor(private dialogRef: MatDialogRef<AddDepartamentoComponent>) {
    
  }
  public onSubmit: EventEmitter<DptoPost> = new EventEmitter();

  

  ngOnInit() {
    // Suscribirse al formulario completo
    this.addDptoForm.statusChanges.subscribe(status => {
      if (status === 'INVALID') {
        this.showInvalidFields();
        console.log(this.addDptoForm.value); // Muestra todos los valores del formulario


        console.log('El formulario es inválido');
      } else if (status === 'VALID') {
        console.log('El formulario es válido');
      }
    });
  }
  showInvalidFields() {
    Object.keys(this.addDptoForm.controls).forEach(key => {
      const control = this.addDptoForm.get(key);
      if (control && control.invalid) {
        console.log(`El campo ${key} es inválido`);
      }
    });
  }

  




  
  emitCredentials() {
    if (this.addDptoForm.valid) {
      const dpto: DptoPost = {
        ubicacion: {
          ubicacion:{
            estado: this.addDptoForm.get('estado_ubicacion')?.value || '',
            municipio: this.addDptoForm.get('municipio')?.value || '',
            colonia: this.addDptoForm.get('colonia')?.value || '',
            calle: this.addDptoForm.get('calle')?.value || '',
            num_ext: this.addDptoForm.get('num_ext')?.value || '',
            num_int: this.addDptoForm.get('num_int')?.value || '',
            cod_postal: this.addDptoForm.get('cod_postal')?.value || ''

          },
          archivo: {
            nombre: "ubicacion",
            tipo: "url",
            url: this.addDptoForm.get('url')?.value || '',
          }
          
        }, 
        departamento: {
          nombre: this.addDptoForm.get('nombre')?.value || '',
          descripcion: this.addDptoForm.get('descripcion')?.value || '',
          valoracion: Number(this.addDptoForm.get('valoracion')?.value) || 0,
          habitaciones: this.addDptoForm.get('habitaciones')?.value || 0,
          banos: this.addDptoForm.get('banos')?.value || 0,
          fecha_construccion: new Date(this.addDptoForm.get('fecha_construccion')?.value || new Date()),
          apreciacion: 0
        }
      }
      this.onSubmit.emit(dpto as DptoPost);
      this.dialogRef.close(dpto as DptoPost);
      console.log('Formulario válido');
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
  // Método para obtener los mensajes de error
getErrorMessage(controlName: string): string {
  const control = this.addDptoForm.get(controlName);

  if (control?.hasError('required') && control.touched) {
    return 'Este campo es obligatorio';
  }

  if (control?.hasError('min') && control.touched) {
    return 'El valor debe ser mayor o igual a 1';
  }

  return '';
}

// Método para verificar si el control ha sido tocado
isControlTouched(controlName: string): boolean {
  return this.addDptoForm.get(controlName)?.touched || false;
}

}
