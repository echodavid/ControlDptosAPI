import { Injectable } from '@angular/core';
import { PagoArchivoPost } from '../interfaces/dpto.response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  constructor(
    private http: HttpClient
  ) { }
  private readonly baseUrl= environment.baseUrl;




  

  
}
