import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { ServicioAsignado } from '../interfaces/servicioAsignado.respone';
import { catchError, map, Observable, throwError } from 'rxjs';
import { PagoArchivoPost } from '../interfaces/dpto.response';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiciosAsignadosService {
  

  constructor(
    private http: HttpClient
  ) { }

  private readonly baseUrl = environment.baseUrl;

  private _serviciosAsignados = signal<ServicioAsignado[]>([]);
  public serviciosAsignados = computed(() => this._serviciosAsignados());

  private setServiciosAsignados(serviciosAsignados: ServicioAsignado[]): boolean {
    if (serviciosAsignados) {
      this._serviciosAsignados.set(serviciosAsignados);
    } else {
      this._serviciosAsignados.set([]);
    }
    return true;
  }

  getServiciosAsignadosPagables(): Observable<ServicioAsignado[]> {

    const url = `${this.baseUrl}/servicios-asignados/pagables`;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    console.log('Headers:', headers);
    return this.http.get<ServicioAsignado[]>(url, { headers })
      .pipe(
        map((response) => {
          console.log('Servicios asignados:', response);
          this.setServiciosAsignados(response);
          return response;
        }),
        catchError((error) => {
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
          console.error('Error getting servicios asignados:', error);
          return throwError(() => new Error(error.error.message || 'Server error'));
        })
      );
  }

  getServiciosAsignadosPagablesUser(): Observable<ServicioAsignado[]> {
    const url = `${this.baseUrl}/servicios-asignados/pagables/user`;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<ServicioAsignado[]>(url, { headers })
      .pipe(
        map((response) => {
          this.setServiciosAsignados(response);
          return response;
        }),
        catchError((error) => {
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
          console.error('Error getting servicios asignados:', error);
          return throwError(() => new Error(error.error.message || 'Server error'));
        })
      );
  }

  updatePago(pago: PagoArchivoPost, id_servicio: string = ""): Observable<void>{
    const url = `${this.baseUrl}/servicios-asignados/update/pago/${id_servicio}`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<void>(url, pago, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error updating pago:', error);
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
          return throwError(() => new Error(error.error.message || 'Server error'));
        }
      )
    );
  }
  updatePagoUser(pago: PagoArchivoPost, id_servicio: string = ""): Observable<void>{
    const url = `${this.baseUrl}/servicios-asignados/update/pagoUser/${id_servicio}`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<void>(url, pago, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error updating pago:', error);
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
          return throwError(() => new Error(error.error.message || 'Server error'));
        }
      )
    );
  }

}
