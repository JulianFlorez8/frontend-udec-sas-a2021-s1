import { Injectable } from '@angular/core';
import { UsuarioModel } from '../modelos/usuario.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import{ ServiceConfig} from '../config/service.config';
@Injectable({
  providedIn: 'root'
})



export class UsuariosService {
  entity:String ='usuarios';
  constructor(
    private http: HttpClient
  ) { }
  creacionUsuarios( model: UsuarioModel): Observable <UsuarioModel>{
    return this.http.post<UsuarioModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({})
    })
  }
}
