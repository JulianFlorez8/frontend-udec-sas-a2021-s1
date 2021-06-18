import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service.config';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { SeguridadService } from '../seguridad/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  token:String='';
  entity:String ='pais';
  cuenta: String= 'pais/count';
  constructor(
    private http: HttpClient,
    private servicioSeguridad: SeguridadService
  ) { this.token= this.servicioSeguridad.getToken() }
  creacionPais( model: PaisModel): Observable <PaisModel>{
    return this.http.post<PaisModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }
  obtenerCantidadPaises(): Observable<number>{
    return this.http.get<number>(`${ServiceConfig.BASE_URL}${this.cuenta}`)
  }
  actualizarPais(id: number,model: PaisModel): Observable<PaisModel>{//Revisar retorno
    return this.http.put<PaisModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }
  parcharPais(id: number,model: PaisModel): Observable<PaisModel>{//Revisar retorno
    return this.http.patch<PaisModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerPais(id: number): Observable<PaisModel>{//Revisar retorno
    return this.http.get<PaisModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`)
  }
  eliminarPais(id: number){//Revisar retorno
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${id}`);
  }
  obtenerPaises():Observable<PaisModel[]>{//Sin filtro
    return this.http.get<PaisModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`)    
  }
  parcharPaises(model: PaisModel):Observable<PaisModel>{//Sin filtro
    return this.http.patch<PaisModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerCiudadesPais(id: number): Observable<CiudadModel[]>{
    return this.http.get<CiudadModel[]>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/ciudads`);
  }
  parcharCiudadesPais(id: number, model:CiudadModel): Observable<CiudadModel>
  {
    return this.http.patch<CiudadModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/ciudads`, model, {
      headers: new HttpHeaders({})
    })
  }
  crearCiudadesPais(id: number, model:CiudadModel): Observable<CiudadModel>
  {
    return this.http.post<CiudadModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/ciudads`, model, {
      headers: new HttpHeaders({})
    })
  }
  eliminarCiudadesPais(id: number)
  {
    return this.http.delete( `${ServiceConfig.BASE_URL}${this.entity}/${id}/ciudads`)
  }
}
