import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service.config';
import { BloqueModel } from 'src/app/models/parametrizacion/bloque.model';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
import { ProyectoModel } from 'src/app/models/parametrizacion/proyectos.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { SeguridadService } from '../seguridad/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  token:String='';
  entity:String ='proyectos';
  cuenta: String= 'proyectos/count';
  constructor(
    private http: HttpClient,
    private servicioSeguridad: SeguridadService
    
  ) {this.token= this.servicioSeguridad.getToken() }
  creacionProyecto( model: ProyectoModel): Observable <ProyectoModel>{
    console.log(this.token);
    
    return this.http.post<ProyectoModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }
  obtenerCantidadProyectos(): Observable<number>{
    return this.http.get<number>(`${ServiceConfig.BASE_URL}${this.cuenta}`)
  }
  actualizarProyecto(id: number,model: ProyectoModel): Observable<ProyectoModel>{//Revisar retorno
    return this.http.put<ProyectoModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }
  parcharProyecto(id: number,model: ProyectoModel): Observable<ProyectoModel>{//Revisar retorno
    return this.http.patch<ProyectoModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerProyecto(id: number,model: ProyectoModel): Observable<ProyectoModel>{//Revisar retorno
    return this.http.get<ProyectoModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`)
  }
  eliminarProyecto(id: number){//Revisar retorno
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${id}`);
  }
  obtenerProyectos():Observable<ProyectoModel[]>{//Sin filtro
    return this.http.get<ProyectoModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`)    
  }
  parcharProyectos(model: ProyectoModel):Observable<ProyectoModel>{//Sin filtro
    return this.http.patch<ProyectoModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerBloquesProyecto(id: number): Observable<BloqueModel[]>{
    return this.http.get<BloqueModel[]>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/bloques`)
  }
  parcharBloquesProyecto(id: number, model:BloqueModel): Observable<BloqueModel>
  {
    return this.http.patch<BloqueModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/bloques`, model, {
      headers: new HttpHeaders({})
    })
  }
  crearBloquesProyecto(id: number, model:BloqueModel): Observable<BloqueModel>
  {
    return this.http.post<BloqueModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/bloques`, model, {
      headers: new HttpHeaders({})
    })
  }
  eliminarBloquesProyecto(id: number)
  {
    return this.http.delete( `${ServiceConfig.BASE_URL}${this.entity}/${id}/bloques`)
  }
  obtenerCiudadProyecto(id: number): Observable<CiudadModel>{//me dice a q ciudad pértenece un proyecto
    return this.http.get<CiudadModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/ciudad`)
  }
  obtenerUsuariosProyecto(id: number): Observable<UsuarioModel[]>{//me dice el usuario q creo un proyecto
    return this.http.get<UsuarioModel[]>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/usuarios`)
  }

}
