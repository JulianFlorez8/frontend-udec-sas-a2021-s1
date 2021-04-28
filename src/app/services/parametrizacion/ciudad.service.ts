import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service.config';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
import { ClienteModel } from 'src/app/models/parametrizacion/cliente.model';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { ProyectoModel } from 'src/app/models/parametrizacion/proyectos.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { SeguridadService } from '../seguridad/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  entity:String ='ciudads';
  cuenta: String= 'ciudads/count';
  token:String='';

  constructor(
    private http: HttpClient,
    
private servicioSeguridad: SeguridadService
  ) { this.token= this.servicioSeguridad.getToken() }
  creacionCiudad( model: CiudadModel): Observable <CiudadModel>{
    return this.http.post<CiudadModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }
  obtenerCantidadCiudades(): Observable<number>{
    return this.http.get<number>(`${ServiceConfig.BASE_URL}${this.cuenta}`)
  }
  actualizarCiudad(id: number,model: CiudadModel): Observable<CiudadModel>{//Revisar retorno
    return this.http.put<CiudadModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }
  parcharCiudad(id: number,model: CiudadModel): Observable<CiudadModel>{//Revisar retorno
    return this.http.patch<CiudadModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerCiudad(id: number,model: CiudadModel): Observable<CiudadModel>{//Revisar retorno
    return this.http.get<CiudadModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`)
  }
  eliminarCiudad(id: number){//Revisar retorno
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${id}`);
  }
  obtenerCiudades():Observable<CiudadModel[]>{//Sin filtro
    return this.http.get<CiudadModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`)    
  }
  parcharUsuarios(model: CiudadModel):Observable<CiudadModel>{//Sin filtro
    return this.http.patch<CiudadModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerClientesCiudad(id: number): Observable<ClienteModel[]>{
    return this.http.get<ClienteModel[]>(`${ServiceConfig.BASE_URL}${this.entity}/${id}/clientes`);
  }
  eliminarClientesCiudad(id: number){
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${id}/clientes`);
  }
  parcharClientesCiudad(id: number, model: ClienteModel):Observable<ClienteModel>{
    return this.http.patch<ClienteModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/clientes`, model, {
      headers: new HttpHeaders({})
    })
  }
  crearClientesCiudad(id: number, model: ClienteModel):Observable<ClienteModel>{
    return this.http.post<ClienteModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/clientes`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerProyectoCiudad(id: number): Observable<ProyectoModel[]>{
    return this.http.get<ProyectoModel[]>(`${ServiceConfig.BASE_URL}${this.entity}/${id}/proyectos`);
  }
  eliminarProyectoCiudad(id: number){
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${id}/proyectos`);
  }
  parcharProyectosCiudad(id: number, model: ProyectoModel):Observable<ProyectoModel>{
    return this.http.patch<ProyectoModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/proyectos`, model, {
      headers: new HttpHeaders({})
    })
  }
  crearProyectosCiudad(id: number, model: ProyectoModel):Observable<ProyectoModel>{
    return this.http.post<ProyectoModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/proyectos`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerUsuariosCiudad(id: number): Observable<UsuarioModel[]>{
    return this.http.get<UsuarioModel[]>(`${ServiceConfig.BASE_URL}${this.entity}/${id}/usuarios`);
  }
  eliminarUsuariosCiudad(id: number){
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${id}/usuarios`);
  }
  parcharUsuariosCiudad(id: number, model: UsuarioModel):Observable<UsuarioModel>{
    return this.http.patch<UsuarioModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/usuarios`, model, {
      headers: new HttpHeaders({})
    })
  }
  crearUsuariosCiudad(id: number, model: UsuarioModel):Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/usuarios`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerPaisesCiudad(id: number): Observable<PaisModel[]>{
    return this.http.get<PaisModel[]>(`${ServiceConfig.BASE_URL}${this.entity}/${id}/pais`);
  }
}
