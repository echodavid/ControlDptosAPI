import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';

import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {merge} from 'rxjs';
import {MatIconModule} from '@angular/material/icon';

import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

    @Output()
    public onSubmit: EventEmitter<{email: string, password: string}> = new EventEmitter();


    emitCredentials() {
        this.onSubmit.emit({
            email: this.email.value,
            password: this.password.value
        });
    }


    private fb = inject(FormBuilder);

    public myForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    email = this.myForm.get('email') as FormControl;
    password = this.myForm.get('password') as FormControl;

    errorMessageEmail = signal('');
    errorMessagePassword = signal('');

    constructor() {
        merge(this.email.statusChanges, this.email.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessageEmail());
        merge(this.password.statusChanges, this.password.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessagePassword());
    }

    updateErrorMessageEmail() {
        if (this.email.hasError('required')) {
        this.errorMessageEmail.set('You must enter a value');
        } else if (this.email.hasError('email')) {
        this.errorMessageEmail.set('Not a valid email');
        } else {
        this.errorMessageEmail.set('');
        }
    }
    updateErrorMessagePassword() {
        if (this.password.hasError('required')) {
        this.errorMessagePassword.set('You must enter a value');
        } else if (this.password.hasError('minlength')) {
        this.errorMessagePassword.set('Not a valid password');
        } else {
        this.errorMessagePassword.set('');
        }
    }



    hide = signal(true);
    clickEvent(event: MouseEvent) {
        this.hide.set(!this.hide());
        event.stopPropagation();
    }


}
