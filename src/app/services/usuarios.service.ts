import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import{ ServiceConfig} from '../config/service.config';
import { CambioContrasenaModel } from '../models/seguridad/cambio-contrasena';
import { ResetearContrasenaModel } from '../models/seguridad/resetear-contrasena';
@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  entity:String ='usuarios';
  cambio:String= 'cambio-contrasena';
  reseteo: String= 'reset-password';
  cuenta: String= 'usuarios/count';
  constructor(
    private http: HttpClient
  ) { }
  creacionUsuarios( model: UsuarioModel): Observable <UsuarioModel>{
    return this.http.post<UsuarioModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({})
    })
  }
  cambiarContrasena(model:CambioContrasenaModel ): Observable<CambioContrasenaModel>{
    return this.http.post<CambioContrasenaModel>(`${ServiceConfig.BASE_URL}${this.cambio}`, model, {
      headers: new HttpHeaders({})
    })
  }
  resetearContrasena(model: ResetearContrasenaModel): Observable<ResetearContrasenaModel>{
    return this.http.post<ResetearContrasenaModel>( `${ServiceConfig.BASE_URL}${this.reseteo}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerCantidadUsuarios(): Observable<number>{
    return this.http.get<number>(`${ServiceConfig.BASE_URL}${this.cuenta}`)
  }
  actualizarUsuario(id: number,model: UsuarioModel): Observable<UsuarioModel>{//Revisar retorno
    return this.http.put<UsuarioModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({})
    })
  }
  parcharUsuario(id: number,model: UsuarioModel): Observable<UsuarioModel>{//Revisar retorno
    return this.http.patch<UsuarioModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerUsuario(id: number,model: UsuarioModel): Observable<UsuarioModel>{//Revisar retorno
    return this.http.get<UsuarioModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`)
  }
  eliminarUsuario(id: number,model: UsuarioModel){//Revisar retorno
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${id}`);
  }
  obtenerUsuarios():Observable<UsuarioModel[]>{//Sin filtro
    return this.http.get<UsuarioModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`)    
  }
  parcharUsuarios(model: UsuarioModel):Observable<UsuarioModel>{//Sin filtro
    return this.http.patch<UsuarioModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerUsuariosRol(rol:String): Observable<UsuarioModel[]>{//SIN PROGRAMAR
    return this.http.get<UsuarioModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`) ;
  }

}
