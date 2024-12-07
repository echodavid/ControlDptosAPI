import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { LoginResponse } from '../../auth/interfaces';
import { NotificationResponse, NotificationsResponse } from '../interfaces';
import { catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private http: HttpClient

  ) { }
  private readonly baseUrl= environment.baseUrl;

  private _notifications = signal<NotificationResponse[]>([]);

  public notifications = computed(() => this._notifications());
  
  private setNotifications(notifications: NotificationResponse[]): boolean {
    if (notifications) {
      this._notifications.set(notifications);
    } else {
      this._notifications.set([]);
    }
    return true;
  }

  markAsRead(notification: NotificationResponse) {
    const url = `${this.baseUrl}/nots/mark-as-read/${notification.id}`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch(url, {}, {headers})
      .pipe(
        map( () => {
          console.log("Notification marked as read:", notification);
          
          this._notifications.set(this._notifications().filter((n) => n.id !== notification.id));
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

  
  getNotifications() {
    
    const url = `${this.baseUrl}/nots`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<NotificationsResponse>(url, {headers})
      .pipe(
        map( ({data}) => {
          console.log("Response data:", data);
          this.setNotifications(data);
        }),
        catchError( (error) => {
          console.log("cap", error.message);
          this._notifications.set([]);
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
