import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isAuuthenticatedGuard: CanActivateFn = (route, state) => {
  
  const url = state.url;
  localStorage.setItem('url', url);


  const authService = inject(AuthService);
  
  if(authService.authStatus() === AuthStatus.checking){
    return false;
  }
  const router = inject(Router);
  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }
  

  if(url.includes('admin')){
    router.navigate(['/auth/login/admin']);
  }
  router.navigate(['/auth/login/user']);

  
  return false;
};