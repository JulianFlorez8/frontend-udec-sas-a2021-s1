import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/seguridad/usuario.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { ServiceConfig } from '../config/service.config';
import { ResetPasswordModel } from '../models/seguridad/reset-password.model';
import { ChangePasswordModel } from '../models/seguridad/change-password.model';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  userData = new BehaviorSubject<UsuarioModel>(new UsuarioModel());

  constructor(private http: HttpClient) {}

  setUserData(value: UsuarioModel) {
    this.userData.next(value);
  }

  getUserData() {
    return this.userData.asObservable();
  }

  /**
   * Verify credentials of an user to login
   * @param model Data to verify credentials
   */
  LoginUser(model: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(
      `${ServiceConfig.BASE_URL}identificar`,
      model,
      {
        headers: new HttpHeaders({}),
      }
    );
  }
}
