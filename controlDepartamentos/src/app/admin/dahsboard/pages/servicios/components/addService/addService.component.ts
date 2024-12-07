import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { signal } from '@angular/core';
import { ServicioResponse } from '../../../../../../common/interfaces/servicios.reponse';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './addService.component.html',
  styleUrls: ['./addService.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddServiceComponent { 
  public onSubmit: EventEmitter<{ nombre: string, descripcion: string }> = new EventEmitter();

  private fb = inject(FormBuilder);

  public addServicioForm = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]]
  });

  nombre = this.addServicioForm.get('nombre') as FormControl;
  descripcion = this.addServicioForm.get('descripcion') as FormControl;

  errorMessageNombre = signal('');
  errorMessageDescripcion = signal('');

  constructor(private dialogRef: MatDialogRef<AddServiceComponent>) {
    merge(this.nombre.statusChanges, this.nombre.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageNombre());
    merge(this.descripcion.statusChanges, this.descripcion.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageDescripcion());
  }

  emitCredentials() {
    if (this.addServicioForm.valid) {
      this.onSubmit.emit(this.addServicioForm.value as ServicioResponse);
      this.dialogRef.close(this.addServicioForm.value);
      console.log('Formulario válido');
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  updateErrorMessageNombre() {
    if (this.nombre.hasError('required')) {
      this.errorMessageNombre.set('Debe ingresar un valor');
    } else {
      this.errorMessageNombre.set('');
    }
  }

  updateErrorMessageDescripcion() {
    if (this.descripcion.hasError('required')) {
      this.errorMessageDescripcion.set('Debe ingresar un valor');
    } else {
      this.errorMessageDescripcion.set('');
    }
  }
}
