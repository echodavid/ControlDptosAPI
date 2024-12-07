import { ChangeDetectionStrategy, Component, EventEmitter, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { userPatch } from '../../../../../../common/interfaces/userPatch.response';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'admin-add-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    CommonModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent {

  public onSubmit: EventEmitter<userPatch> = new EventEmitter();
  
  emitCredentials() {
    if (this.addUserForm.valid) {
      const user: userPatch = {
        nombre: this.addUserForm.get('nombre')?.value || '',
        apellido: this.addUserForm.get('apellido')?.value || '',
        email: this.addUserForm.get('email')?.value || '',
        telefono: this.addUserForm.get('telefono')?.value || '',
        password: this.addUserForm.get('password')?.value || ''
      }
      this.onSubmit.emit(user as userPatch);
      this.dialogRef.close(user as userPatch);
      console.log('Formulario válido');
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  private fb = inject(FormBuilder);
  public addUserForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50),
      Validators.pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    ]],
  });

  password = this.addUserForm.get('password') as FormControl;
  nombre = this.addUserForm.get('nombre') as FormControl;
  apellido = this.addUserForm.get('apellido') as FormControl;
  email = this.addUserForm.get('email') as FormControl;
  telefono = this.addUserForm.get('telefono') as FormControl;


  errorMessagePassword = signal('');
  errorMessageNombre = signal('');
  errorMessageApellido = signal('');
  errorMessageEmail = signal('');
  errorMessageTelefono = signal('');


  constructor(
    private dialogRef: MatDialogRef<AddUserComponent>
  ) {
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessagePassword());
    merge(this.nombre.statusChanges, this.nombre.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageNombre());
    merge(this.apellido.statusChanges, this.apellido.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageApellido());
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageEmail());
    merge(this.telefono.statusChanges, this.telefono.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageTelefono());
    
  }

  


  getErrorMessage(controlName: string): string {
    switch (controlName) {
      case 'nombre':
        return this.errorMessageNombre();
      case 'password':
        return this.errorMessagePassword();
      case 'apellido':
        return this.errorMessageApellido();
      case 'email':
        return this.errorMessageEmail();
      case 'telefono':
        return this.errorMessageTelefono();
      default:
        return '';
    }
  }


  updateErrorMessagePassword() {
    if (this.password.hasError('required')) {
      this.errorMessagePassword.set('Debe ingresar un valor');
    } else if (this.password.hasError('minlength')) {
      this.errorMessagePassword.set('La contraseña debe tener al menos 6 caracteres');
    } else if (this.password.hasError('maxlength')) {
      this.errorMessagePassword.set('La contraseña no debe tener más de 50 caracteres');
    } else if (this.password.hasError('pattern')) {
      this.errorMessagePassword.set('La contraseña debe tener una letra mayúscula, una letra minúscula y un número');
    } else {
      this.errorMessagePassword.set('');
    }
  }
  updateErrorMessageNombre() {
    if (this.nombre.hasError('required')) {
      this.errorMessageNombre.set('Debe ingresar un valor');
    } else {
      this.errorMessageNombre.set('');
    }
  }
  updateErrorMessageApellido() {
    if (this.apellido.hasError('required')) {
      this.errorMessageApellido.set('Debe ingresar un valor');
    } else {
      this.errorMessageApellido.set('');
    }
  }
  updateErrorMessageEmail() {
    if (this.email.hasError('required')) {
      this.errorMessageEmail.set('Debe ingresar un valor');
    } else if (this.email.hasError('email')) {
      this.errorMessageEmail.set('Debe ingresar un correo electrónico válido');
    } else {
      this.errorMessageEmail.set('');
    }
  }
  updateErrorMessageTelefono() {
    if (this.telefono.hasError('required')) {
      this.errorMessageTelefono.set('Debe ingresar un valor');
    } else if (this.telefono.hasError('pattern')) {
      this.errorMessageTelefono.set('El teléfono debe tener 10 dígitos');
    } else {
      this.errorMessageTelefono.set('');
    }
  }

  isControlTouched(controlName: string): boolean {
    return this.addUserForm.get(controlName)?.touched || false;
  }




}
