import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service.config';
import { PagosModel } from 'src/app/models/ventas/pagos.model';
import { SolicitudEstudioModel } from 'src/app/models/ventas/solicitudEstudio.model';
import { SeguridadService } from '../seguridad/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  token:String='';

  entity:String ='solicitud-estudios';
  cuenta: String= 'solicitud-estudios/count';
  constructor(
    private http: HttpClient,
    private servicioSeguridad: SeguridadService
  ) { this.token= this.servicioSeguridad.getToken() }
  creacionSolicitud( model: SolicitudEstudioModel): Observable <SolicitudEstudioModel>{
    return this.http.post<SolicitudEstudioModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }
  obtenerSolicitudesInmueble(id: number): Observable<SolicitudEstudioModel[]>{
    return this.http.get<SolicitudEstudioModel[]>(`${ServiceConfig.BASE_URL}${this.entity}/${id}/inmueble`)
  }
  obtenerSolicitudesTotalesInmueble(id: number): Observable<SolicitudEstudioModel[]>{
    return this.http.get<SolicitudEstudioModel[]>(`${ServiceConfig.BASE_URL}solicitudes/${id}/inmueble`)
  }
  obtenerSolicitudesCliente(id: number): Observable<SolicitudEstudioModel[]>{
    return this.http.get<SolicitudEstudioModel[]>(`${ServiceConfig.BASE_URL}${this.entity}/${id}/cliente`)
  }
  obtenerCantidadSolicitudes(): Observable<number>{
    return this.http.get<number>(`${ServiceConfig.BASE_URL}${this.cuenta}`)
  }
  actualizarSolicitud(id: number,model: SolicitudEstudioModel): Observable<SolicitudEstudioModel>{//Revisar retorno
    return this.http.put<SolicitudEstudioModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }
  parcharSolicitud(id: number,model: SolicitudEstudioModel): Observable<SolicitudEstudioModel>{//Revisar retorno
    return this.http.patch<SolicitudEstudioModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerSolicitud(id: number): Observable<SolicitudEstudioModel>{//Revisar retorno
    return this.http.get<SolicitudEstudioModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`,{
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }
  eliminarSolicitud(id: number){//Revisar retorno
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${id}`);
  }
  obtenerSolicitudes():Observable<SolicitudEstudioModel[]>{//Sin filtro
    return this.http.get<SolicitudEstudioModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`)    
  }
  obtenerSolicitudesEnEstudio():Observable<SolicitudEstudioModel[]>{//Sin filtro
    return this.http.get<SolicitudEstudioModel[]>(`${ServiceConfig.BASE_URL}solicitudes-en-estudio`)    
  }


  parcharSolicitudes(model: SolicitudEstudioModel):Observable<SolicitudEstudioModel>{//Sin filtro
    return this.http.patch<SolicitudEstudioModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerPagosSolicitud(id: number): Observable<PagosModel[]>{
    return this.http.get<PagosModel[]>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/pagos`,{
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }
  parcharPagosSolicitud(id: number, model:PagosModel): Observable<PagosModel>
  {
    return this.http.patch<PagosModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/pagos`, model, {
      headers: new HttpHeaders({})
    })
  }
  crearPagosSolicitud(id: number, model:PagosModel): Observable<PagosModel>
  {
    return this.http.post<PagosModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/pagos`, model, {
      headers: new HttpHeaders({})
    })
  }
  eliminarPagosSolicitud(id: number)
  {
    return this.http.delete( `${ServiceConfig.BASE_URL}${this.entity}/${id}/pagos`)
}
}
