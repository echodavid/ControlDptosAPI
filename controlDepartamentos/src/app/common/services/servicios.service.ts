import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { ServicioResponse } from '../interfaces/servicios.reponse';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(
    private http: HttpClient

  ) { }

  private readonly baseUrl = environment.baseUrl;

  private _servicios = signal<ServicioResponse[] | null>(null);
  public servicios = computed(() => this._servicios());

  private setServicios(servicios: ServicioResponse[] | null): boolean {
    if (servicios) {
      this._servicios.set(servicios);
    } else {
      this._servicios.set(null);
    }
    return true;
  }


  getServicios() {
    const url = `${this.baseUrl}/servicios`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<ServicioResponse[]>(url, { headers })
      .pipe(
        map((servicios) => {
          this.setServicios(servicios);
        }),
        catchError((error) => {
          console.error('Error fetching servicios:', error);
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
          this._servicios.set([]);
          return throwError(() => error.error.message);
        })
      );
  }
  addServicio(servicio: ServicioResponse): Observable<ServicioResponse> {
    const url = `${this.baseUrl}/servicios`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<ServicioResponse>(url, servicio, { headers })
      .pipe(
        map((newServicio) => {
          this._servicios.update(servicios => servicios ? [...servicios, newServicio] : [newServicio]);
          return newServicio;
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
  
  removeServicio(servicio: ServicioResponse): Observable<void> {
    const url = `${this.baseUrl}/servicios/${servicio.id}`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(url, { headers })
      .pipe(
        map(() => {
          this._servicios.update(servicios => servicios ? servicios.filter(s => s.id !== servicio.id) : []);
        }),
        catchError((error) => {
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
          console.error('Error removing servicio:', error);
          return throwError(() => new Error(error.error.message || 'Server error'));
        })
      );
  }
  
}
