import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inicioSesionModel } from '../models/seguridad/inicioSesion.model';
import { Observable } from 'rxjs';
import { ServiceConfig } from '../config/service.config';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(
    private http: HttpClient
  ) { }

  LoginUser(model: inicioSesionModel): Observable<inicioSesionModel> {
    return this.http.post<inicioSesionModel>(`${ServiceConfig.BASE_URL}identificar`, model, {
      headers: new HttpHeaders({
      })
    })
  }
}