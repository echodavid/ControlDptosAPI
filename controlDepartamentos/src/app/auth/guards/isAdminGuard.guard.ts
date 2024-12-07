import { type CanActivateFn } from '@angular/router';


export const isAdminGuard: CanActivateFn = (route, state) => {
  localStorage.setItem('url', state.url);
  const rol = localStorage.getItem('userRol');
    if(rol === 'admin'){
        return true;
    }
    localStorage.removeItem('userRol');
  return false;
};
