import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule
    

  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  
  private router = inject(Router);
  title = 'controlDepartamentos';

  private authService = inject(AuthService);

  public fishedAuthCheck = computed<boolean>(() => {
    if(this.authService.authStatus() === AuthStatus.checking){
      console.log('app');
      return false;
    }
    return true
  });


  public authStatusChangedEffect = effect(() => {
    
    switch (this.authService.authStatus()) {
      case AuthStatus.authenticated:
        if(localStorage.getItem('userRol') === 'admin'){
          this.router.navigate(['/admin/dashboard/dptos']);
        }
          else {
            this.router.navigate(['/users/dashboard/dptos']);
          }
        break;
      case AuthStatus.notAuthenticated:
        if(localStorage.getItem('userRol') === 'admin' || localStorage.getItem('url')?.includes('admin')){
          this.router.navigate(['/auth/login/admin']);
        }
        else
          this.router.navigate(['/auth/login/user']);

        break;
      case AuthStatus.checking:
        break;

  }

  });

}
