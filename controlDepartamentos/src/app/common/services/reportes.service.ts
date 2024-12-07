import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { ReportePost, ReporteResponse } from '../interfaces/reporte.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly baseUrl = environment.baseUrl;

  private _reportes = signal<ReporteResponse[]>([]);
  public reportes = computed(() => this._reportes());

  private setReportes(reportes: ReporteResponse[]): boolean {
    if (reportes) {
      this._reportes.set(reportes);
    } else {
      this._reportes.set([]);
    }
    return true;
  }

  updateReportes(reporte: ReporteResponse): boolean {
    this._reportes.update(
      currentReportes => currentReportes ? currentReportes.map(
        s => s.id === reporte.id ? reporte : s) : []
    );
    return true;
  }

  addReporte(reporte: ReportePost, id_servicio: string): Observable<boolean> {
    const url = `${this.baseUrl}/reportes/${id_servicio}`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<ReporteResponse>(url, reporte, { headers })
      .pipe(
        map((newReporte:ReporteResponse) => {
          this._reportes.update(reportes => reportes ? [...reportes, newReporte] : [newReporte]);
          return true;
        }),
        catchError((error) => {
          console.error('Error adding reporte:', error);
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
          
          return throwError(() => new Error(error.error.message || 'Server error'));
        })
      );
  }

  getReportesUSer() {
    const url = `${this.baseUrl}/reportes`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ReporteResponse[]>(url, { headers })
      .pipe(
        map((reportes) => {
          this.setReportes(reportes);
          return true;
        }),
        catchError((error) => {
          console.error('Error fetching reportes:', error);
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
          return throwError(() => new Error(error.error.message || 'Server error'));
        })
      )
  }
  markAsAttend(reporte: ReporteResponse) {
    const url = `${this.baseUrl}/reportes/attend/${reporte.id}`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch(url, {}, {headers})
      .pipe(
        map( () => {
          console.log("Reporte marked as read:", reporte);
          
          this._reportes.set(this._reportes().filter((n) => n.id !== reporte.id));
        }),
        catchError( (error) => {
          console.log("cap", error.message);
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
          return throwError(() => error.error.message);
        })
      )
  }
  

}
