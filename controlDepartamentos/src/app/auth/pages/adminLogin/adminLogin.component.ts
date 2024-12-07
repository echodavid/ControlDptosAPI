import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { Router } from '@angular/router';
import { AuthStatus } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [
        CommonModule,
        LoginComponent
    ],
    templateUrl: './adminLogin.component.html',
    styleUrl: './adminLogin.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginComponent {
    
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
        this.authService.loginAdmin(
            email,
            password
        ).subscribe({
            next: () => {
                console.log('Usuario logueado');
                this.router.navigate(['/admin/dashboard/dptos']);
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
