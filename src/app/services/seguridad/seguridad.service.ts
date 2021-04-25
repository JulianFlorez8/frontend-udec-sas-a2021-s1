import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CredencialesModel } from 'src/app/models/seguridad/credenciales.model';
import { InicioModel } from 'src/app/models/seguridad/Inicio.model';
import{ ServiceConfig} from '../../config/service.config';
@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  entity: String= 'identificar';
  constructor(
    private http: HttpClient
  ) { }
  ingresoUsuarios( Credenciales: CredencialesModel): Observable<InicioModel>{
    return this.http.post<InicioModel>( `${ServiceConfig.BASE_URL}${this.entity}`, Credenciales, {
      headers: new HttpHeaders()
    })
  }
}
