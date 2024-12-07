import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, OnInit, signal, Signal, WritableSignal, runInInjectionContext } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserResponse } from '../../../common/interfaces';
import { userPatch } from '../../../common/interfaces/userPatch.response';
import { UserService } from '../../../common/services/user.service';

@Component({
    selector: 'app-personal',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalComponent implements OnInit {
    personalForm: FormGroup;
    public userData: Signal<UserResponse | null> = signal<UserResponse | null>(null);

    constructor(
        private userService: UserService,
        private fb: FormBuilder    ) {
        this.personalForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [
                Validators.minLength(6),
                Validators.maxLength(50),
                Validators.pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
            ]],
            nombre: ['', [Validators.minLength(3)]],
            apellido: ['', [Validators.minLength(3)]],
            telefono: ['']
        });

        // Definir userData como una señal dependiente de la señal en el servicio
        this.userData = computed(() => this.userService.user());

        // Efecto para actualizar el formulario cuando los datos del usuario cambien
        effect(() => {
            const userData = this.userData();
            if (userData) {
              this.personalForm.patchValue({
                email: userData.email,
                nombre: userData.nombre,
                apellido: userData.apellido,
                telefono: userData.telefono
              });
            }
        });
    }


    ngOnInit(): void {
        console.log('PersonalComponent initialized');
        this.userData = computed(() => this.userService.user());

        // Cargar los datos actuales del usuario
        this.userService.getUser().subscribe({
            next: (response: UserResponse) => {
                console.log('User data fetched successfully', response);
                this.userService.setUser(response);
            },
            error: (error) => {
                console.error('Error fetching user data:', error);
            }
        });
    }

    onSubmit(): void {
        if (this.personalForm.valid) {
            const updatedData: userPatch = this.personalForm.value;
            this.userService.updateUser(updatedData).subscribe({
                next: (user) => {
                    console.log('Usuario actualizado:', user);
                    this.userService.setUser(user); // Actualiza la señal con los datos actualizados
                },
                error: (error) => {
                    console.error('Error al actualizar el usuario:', error);
                }
            });
        } else {
            console.log('Formulario inválido');
        }
    }
}
