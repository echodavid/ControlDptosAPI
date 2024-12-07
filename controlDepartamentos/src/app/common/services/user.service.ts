import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { UserResponse } from '../interfaces';
import { catchError, map, Observable, throwError } from 'rxjs';
import { userPatch } from '../interfaces/userPatch.response';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly baseUrl = environment.baseUrl;

  private _user = signal<UserResponse|null>(null);

  public user = computed(() => this._user());

  private _users = signal<UserResponse[]>([]);
  public users = computed(() => this._users());

  public setUsers(users: UserResponse[]): boolean {
    if (users) {
      this._users.set(users);
    } else {
      this._users.set([]);
    }
    return true;
  }

  public setUser(user: UserResponse): boolean {
    if (user) {
      this._user.set(user);
    } else {
      this._user.set(null);
    }
    return true;
  }


  getUser(): Observable<UserResponse> {
    const url = `${this.baseUrl}/user`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<UserResponse>(url, {headers})
    .pipe(
      map((user) => {
        console.log('User data:', user);
        this.setUser(user);
        return user;
      }),
      catchError((error) => {
        this._user.set(null);
        Swal.fire(
          'Error!',
          error.error.message,
          'error'
        )
        return throwError(() => error.error.message);
      })
    );
  }
  getUsers(): Observable<UserResponse[]> {
    const url = `${this.baseUrl}/user/all`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<UserResponse[]>(url, {headers})
    .pipe(
      map((users) => {
        this.setUsers(users);
        return users;
      }),
      catchError((error) => {
        console.log('Error:', error.message);
        Swal.fire(
          'Error!',
          error.error.message,
          'error'
        )
        this._users.set([]);
        return throwError(() => error.error.message);
      })
    );
  }

  removeUser(user: UserResponse): Observable<void> {
    const url = `${this.baseUrl}/user/${user.id}`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(url, { headers })
      .pipe(
        map(() => {
          this._users.update(users => users ? users.filter(s => s.id !== user.id) : []);
        }),
        catchError((error) => {
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
          console.log('Error:', error.message);
          return throwError(() => new Error(error.error.message || 'Server error'));
        })
      );
  }

  updateUser(user: userPatch): Observable<UserResponse> {

    console.log(user)
    const url = `${this.baseUrl}/user`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    if(user.password == ''){
      delete user.password;
    }

    return this.http.patch<UserResponse>(url, user, { headers })
      .pipe(
        map((user) => {
          console.log('User data:', user);
          this.setUser(user);
          return user;
        }),
        catchError((error) => {
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
          console.log('Error:', error.message);
          return throwError(() => new Error(error.error.message || 'Server error'));
        })
      );
  }


  addUser(user: userPatch): Observable<void> {
    const url = `${this.baseUrl}/auth/register`;
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<UserResponse>(url, user, { headers })
      .pipe(
        map(() => {
          this.getUsers().subscribe({
            next: (newUser) => {
              this._users.update(users => users ? [...users, ...newUser] : newUser);
              console.log('Users added successfully', newUser);
            },
            error: (error) => {
              console.error('Error adding users:', error);
              Swal.fire(
                'Error!',
                error.error.message,
                'error'
              )
              return throwError(() => new Error(error.error.message || 'Server error'));
            }
          });
        }),
        catchError((error) => {
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
          console.error('Error adding user:', error);
          return throwError(() => new Error(error.error.message || 'Server error'));
        })
      );
  }


}
