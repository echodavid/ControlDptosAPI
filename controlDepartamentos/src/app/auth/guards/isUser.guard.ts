import { type CanActivateFn } from '@angular/router';


export const isUser: CanActivateFn = (route, state) => {
  const rol = localStorage.getItem('userRol');
    if(rol === 'user'){
        return true;
    }
    localStorage.removeItem('userRol');
  return false;
};
