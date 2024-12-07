import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DptoReponse, ServiciosAsignadoPost } from '../interfaces/dpto.response';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserResponse } from '../interfaces';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  constructor(
    private http: HttpClient

  ) { }
  private readonly baseUrl= environment.baseUrl;


  private _departamentos = signal<DptoReponse[]>([]);

  public departamentos = computed(() => this._departamentos());

  private setDepartamentos(dptos: DptoReponse[]): boolean {
    if(dptos){
      this._departamentos.set(dptos)
    } else {
      this._departamentos.set([])

    }
    return true;
  }
  
  updateDptos(dptos: DptoReponse): boolean {
    this._departamentos.update(
      currentDptos => currentDptos ? currentDptos.map(
        s => s.id === dptos.id ? dptos : s) : []
    );
    return true;
  }


  addDepartamento(dpto: DptoReponse): Observable<boolean> {
    const url = `${this.baseUrl}/departamentos`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<DptoReponse>(url, dpto, { headers })
      .pipe(
        map((newDpto) => {
          this._departamentos.update(dptos => dptos ? [...dptos, newDpto] : [newDpto]);
          return true;
        }),
        catchError((error) => {
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
          console.error('Error adding dpto:', error);
          return throwError(() => new Error(error.error.message || 'Server error'));
        })
      );
  }

  getDepartamentosUser() {
      
      const url = `${this.baseUrl}/departamentos/user`;
      const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.get<DptoReponse[]>(url, {headers})
        .pipe(
          map( (response) => {
            console.log("Response:", response);
            this.setDepartamentos(response);
          }),
          catchError( (error) => {
            Swal.fire(
              'Error!',
              error.error.message,
              'error'
            )
            return throwError(() => error.error.message);
          })
        )
    }
    getDepartamentos() {
      
      const url = `${this.baseUrl}/departamentos`;
      const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.get<DptoReponse[]>(url, {headers})
        .pipe(
          map( (response) => {
            console.log("Response:", response);
            this.setDepartamentos(response);
          }),
          catchError( (error) => {
            Swal.fire(
              'Error!',
              error.error.message,
              'error'
            )
            console.log("cap", error.message);
            return throwError(() => error.error.message);
          })
        )
    }

    removeDpto(dpto: DptoReponse): Observable<void> {
      const url = `${this.baseUrl}/departamentos/${dpto.id}`;
      const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.delete<void>(url, { headers })
        .pipe(
          map(() => {
            this._departamentos.update(dptos => dptos ? dptos.filter(s => s.id !== dpto.id) : []);
          }),
          catchError((error) => {
            Swal.fire(
              'Error!',
              error.error.message,
              'error'
            )
            console.error('Error removing dpto:', error);
            return throwError(() => new Error(error.error.message || 'Server error'));
          })
        );
    }

    addServicio(servicio: ServiciosAsignadoPost): Observable<void> {
      const url = `${this.baseUrl}/departamentos/asign-service`;
      const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.patch<DptoReponse>(url, servicio, { headers })
        .pipe(
          map((result) => {
            this._departamentos.update(dptos => dptos ? dptos.map(s => s.id === servicio.id_departamento ? { ...s, servicios: [...result.servicios ] } : s) : []);
          }),
          catchError((error) => {
            Swal.fire(
              'Error!',
              error.error.message,
              'error'
            )
            console.error('Error adding servicio:', error);
            return throwError(() => new Error(error.error.message || 'Server error'));
          })
        );
    }

    asignarUserDpto(dpto: DptoReponse, user: UserResponse): Observable<void> {
      const url = `${this.baseUrl}/departamentos/${dpto.id}`;
      const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const body = {
        user_id: user.id
      };
      return this.http.patch<void>(url, body, { headers })
        .pipe(
          map(() => {
            this._departamentos.update(dptos => dptos ? dptos.map(s => s.id === dpto.id ? { ...s, user: user } : s) : []);
          }),
          catchError((error) => {
            console.error('Error asignando user:', error);
            Swal.fire(
              'Error!',
              error.error.message,
              'error'
            )
            return throwError(() => new Error(error.error.message || 'Server error'));
          })
        );

    }

}
