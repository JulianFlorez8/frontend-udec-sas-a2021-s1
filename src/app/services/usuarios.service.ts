import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import{ ServiceConfig} from '../config/service.config';
import { CambioContrasenaModel } from '../models/seguridad/cambio-contrasena';
import { ResetearContrasenaModel } from '../models/seguridad/resetear-contrasena';
import { CiudadModel } from '../models/parametrizacion/ciudad.model';
import { ClienteModel } from '../models/parametrizacion/cliente.model';
import { ProyectoModel } from '../models/parametrizacion/proyectos.model';
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
  eliminarUsuario(id: number){//Revisar retorno
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


  obtenerCiudadUsuario(id: number): Observable<CiudadModel>{//me dice la ciudad del usuario
    return this.http.get<CiudadModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/ciudad`)
  }


  obtenerClientesUsuario(id: number): Observable<ClienteModel[]>{
    return this.http.get<ClienteModel[]>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/clientes`)
  }
  parcharClientesUsuario(id: number, model:ClienteModel): Observable<ClienteModel>
  {
    return this.http.patch<ClienteModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/clientes`, model, {
      headers: new HttpHeaders({})
    })
  }
  crearClientesUsuario(id: number, model:ClienteModel): Observable<ClienteModel>
  {
    return this.http.post<ClienteModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/clientes`, model, {
      headers: new HttpHeaders({})
    })
  }
  eliminarClientesUsuario(id: number)
  {
    return this.http.delete( `${ServiceConfig.BASE_URL}${this.entity}/${id}/clientes`)
}
obtenerProyectosUsuario(id: number): Observable<ProyectoModel[]>{
  return this.http.get<ProyectoModel[]>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/proyectos`)
}
parcharProyectosUsuario(id: number, model:ProyectoModel): Observable<ProyectoModel>
{
  return this.http.patch<ProyectoModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/proyectos`, model, {
    headers: new HttpHeaders({})
  })
}
crearProyectosUsuario(id: number, model:ProyectoModel): Observable<ProyectoModel>
{
  return this.http.post<ProyectoModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/proyectos`, model, {
    headers: new HttpHeaders({})
  })
}
eliminarProyectosUsuario(id: number)
{
  return this.http.delete( `${ServiceConfig.BASE_URL}${this.entity}/${id}/proyectos`)
}
}
