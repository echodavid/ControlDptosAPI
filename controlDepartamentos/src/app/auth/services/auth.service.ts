import { computed, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckAuthStatusResponse, LoginResponse, User } from '../interfaces';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
    this.checkAuthStatus().subscribe();

  }

  private readonly baseUrl= environment.baseUrl;

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());


  private setAuthentication(user: User, token: string): boolean{
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('userRol', user.rol);
    localStorage.setItem('token', token);
    return true;
  }
  loginUser(email: string, password: string) {
    const url = `${this.baseUrl}/auth/login`;
    const body = {email, password};

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map( ({user, token}) => {
          this.setAuthentication(user, token);
        }),
        catchError( (error) => {
          localStorage.removeItem('token');
          localStorage.removeItem('userRol');
          this._authStatus.set(AuthStatus.notAuthenticated);
          return throwError(() => error.error.message);
        })
      )
  }
  loginAdmin(email: string, password: string) {
    const url = `${this.baseUrl}/auth/admin/login`;
    const body = {email, password};

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map( ({user, token}) => {
          this.setAuthentication(user, token);
        }),
        catchError( (error) => {
          localStorage.removeItem('token');
          localStorage.removeItem('userRol');
          this._authStatus.set(AuthStatus.notAuthenticated);
          return throwError(() => error.error.message);
        })
      )
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-auth-status`;
    const token = localStorage.getItem('token');
    if(!token) {
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckAuthStatusResponse>
    (url, {headers})
      .pipe(
        map(
          ({token, user}) => {
            this.setAuthentication(user, token);
            return true;
          }
        ),
        catchError( (err) =>{
          console.log('Error checking auth status', err.message);
          this._authStatus.set(AuthStatus.notAuthenticated);
          
          return of(false);
        })
      )

      
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRol');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

  

}
