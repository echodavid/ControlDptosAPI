import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isNotAuuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const url = state.url;
  localStorage.setItem('url', url);


  if (authService.authStatus() === AuthStatus.authenticated) {
    // router.navigate(['/users/dashboard/dptos']);
    return false;
  }
  return true;
};
