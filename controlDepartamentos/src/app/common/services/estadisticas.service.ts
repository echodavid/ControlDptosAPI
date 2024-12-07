import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { catchError, map, throwError } from 'rxjs';
import { EstadisticasAdmin, EstadisticasUser } from '../interfaces/estadisticas.model';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(
    private http: HttpClient
  ) { }

  private _estadisticasAdmin = signal<EstadisticasAdmin|null>(null);
  public estadisticasAdmin = computed(() => this._estadisticasAdmin());

  private _estadisticas = signal<EstadisticasUser|null>(null);
  public estadisticas = computed(() => this._estadisticas());


  private setEstadisticasAdmin(estadisticas: EstadisticasAdmin): boolean {
    if (estadisticas) {
      this._estadisticasAdmin.set(estadisticas);
    } else {
      this._estadisticasAdmin.set(null);
    }
    return true;
  }

  private setEstadisticasUser(estadisticas: EstadisticasUser): boolean {
    if (estadisticas) {
      this._estadisticas.set(estadisticas);
    } else {
      this._estadisticas.set(null);
    }
    return true;
  }


  private readonly baseUrl = environment.baseUrl;

  getEstadisticasAdmin() {
    const url = `${this.baseUrl}/estadisticas`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<EstadisticasAdmin>(url, { headers })
      .pipe(
        map((data) => {
          console.log('Estadisticas fetched successfully', data);
          this.setEstadisticasAdmin(data);
          return data;
        }),
        catchError((error) => {
          console.error('Error fetching estadisticas:', error);
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
          this._estadisticasAdmin.set(null);
          return throwError(() => new Error(error.error.message || 'Server error'));
        })
      )
  }

  getEstadisticasUser() {
    const url = `${this.baseUrl}/estadisticas/user`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<EstadisticasUser>(url, { headers })
      .pipe(
        map((data) => {
          console.log('Estadisticas fetched successfully', data);
          this.setEstadisticasUser(data);
          return data;
        }),
        catchError((error) => {
          console.error('Error fetching estadisticas:', error);
          this._estadisticas.set(null);
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
          return throwError(() => new Error(error.error.message || 'Server error'));
        })
      )
  }


}
