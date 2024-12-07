import { Routes } from '@angular/router';
import { isAdminGuard, isAuuthenticatedGuard, isNotAuuthenticatedGuard, isUser } from './auth/guards';



export const routes: Routes = [
  {
    path: 'users',
    canActivate: [isAuuthenticatedGuard, isUser],
    loadComponent: () => import('./users/users.component')
    .then(m => m.UsersComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard/dptos',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./users/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
        children: [
          {
            path: '',
            redirectTo: 'dptos',
            pathMatch: 'full'
          },
          {
            path: 'dptos',
            loadComponent: () => import('./users/dashboard/pages/dptos/dptos.component')
            .then(m => m.DptosComponent)
          },
          {
            path: 'nots',
            loadComponent: () => import('./users/dashboard/pages/nots/nots.component')
            .then(m => m.NotsComponent)
          },
          
          {
            path: 'pagos',
            loadComponent: () => import('./users/dashboard/pages/pagos/pagos.component')
            .then(m => m.PagosComponent)
          },
          {
            path: 'reportes',
            loadComponent: () => import('./users/dashboard/pages/reportes/reportes.component')
            .then(m => m.ReportesComponent)
          },
          {
            path: 'estadisticas',
            loadComponent: () => import('./users/dashboard/pages/estadisticas/estadisticas.component')
            .then(m => m.EstadisticasComponent)
          }
        ]
      },
      {
        path: 'profile',
        loadComponent: () => import('./users/pages/personal/personal.component')
        .then(m => m.PersonalComponent),
      },
      
    ]
  },
  {
    path: 'admin',
    canActivate: [isAuuthenticatedGuard, isAdminGuard],
    loadComponent: () => import('./admin/admin.component')
    .then(m => m.AdminComponent),
    children: [
        {
          path: '',
          redirectTo: 'dashboard/dptos',
          pathMatch: 'full'
        },
        {
          path: 'dashboard',
          loadComponent: () => import('./admin/dahsboard/dahsboard.component')
          .then(m => m.DahsboardComponent),
          children: [
            {
              path: '',
              redirectTo: 'dptos',
              pathMatch: 'full'
            },
            {
              path: 'dptos',
              loadComponent: () => import('./admin/dahsboard/pages/dptos/dptos.component')
              .then(m => m.DptosComponent)
            },
            {
              path: 'nots',
              loadComponent: () => import('./admin/dahsboard/pages/nots/nots.component')
              .then(m => m.NotsComponent)
            },
            {
              path: 'servicios',
              loadComponent: () => import('./admin/dahsboard/pages/servicios/servicios.component')
              .then(m => m.ServiciosComponent)
            },
            {
              path: 'users',
              loadComponent: () => import('./admin/dahsboard/pages/Usuarios/Usuarios.component')
              .then(m => m.UsuariosComponent)
            },
            {
              path: 'pagos',
              loadComponent: () => import('./admin/dahsboard/pages/pagos/pagos.component')
              .then(m => m.PagosComponent)
            },
            {
              path: 'estadisticas',
              loadComponent: () => import('./admin/dahsboard/pages/estadisticas/estadisticas.component')
              .then(m => m.EstadisticasComponent)
            }
            
        ]
          
        },
    ]
  },
  {
    path: 'auth',
    
    children: [
      {
        path: 'login/admin',
        loadComponent: () => import('./auth/pages/adminLogin/adminLogin.component')
        .then(m => m.AdminLoginComponent),
      },
      {
        path: 'login/user',
        canActivate: [isNotAuuthenticatedGuard],
        loadComponent: () => import('./auth/pages/userLogin/userLogin.component')
        .then(m => m.UserLoginComponent),
      },
      {
        path: '',
        redirectTo: 'login/user',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }

  
];
