import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';


import { AuthService } from '../../services/auth.service';
import { AuthStatus } from '../../interfaces';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-user-login',
    standalone: true,
    imports: [
        CommonModule,
        LoginComponent,
    ],
    templateUrl: './userLogin.component.html',
    styleUrl: './userLogin.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLoginComponent {
    private router = inject(Router);


    public authStatus: AuthStatus;

    constructor(private authService: AuthService) {
        this.authStatus = this.authService.authStatus();
        
    }


    onSubmit({email, password}: {email: string, password: string}) {
        this.login({email, password});
        this.authStatus = this.authService.authStatus();
    }

    


    login({email, password}: {email: string, password: string}) {
        this.authService.loginUser(
            email,
            password
        ).subscribe({
            next: () => {
                console.log('Usuario logueado');
                this.router.navigate(['/users/dashboard/dptos']);
            },
            error: (error) => {
                console.log(error);
                Swal.fire(
                    'Error!',
                    'Credenciales no válidas',
                    'error'
                  );
            }
        }
        );

    }

}
