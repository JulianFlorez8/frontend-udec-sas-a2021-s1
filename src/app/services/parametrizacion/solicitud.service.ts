import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service.config';
import { PagosModel } from 'src/app/models/parametrizacion/pagos.model';
import { SolicitudEstudioModel } from 'src/app/models/parametrizacion/solicitudEstudio.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  entity:String ='solicitud-estudios';
  cuenta: String= 'solicitud-estudios/count';
  constructor(
    private http: HttpClient
  ) { }
  creacionSolicitud( model: SolicitudEstudioModel): Observable <SolicitudEstudioModel>{
    return this.http.post<SolicitudEstudioModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerCantidadSolicitudes(): Observable<number>{
    return this.http.get<number>(`${ServiceConfig.BASE_URL}${this.cuenta}`)
  }
  actualizarSolicitud(id: number,model: SolicitudEstudioModel): Observable<SolicitudEstudioModel>{//Revisar retorno
    return this.http.put<SolicitudEstudioModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({})
    })
  }
  parcharSolicitud(id: number,model: SolicitudEstudioModel): Observable<SolicitudEstudioModel>{//Revisar retorno
    return this.http.patch<SolicitudEstudioModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerSolicitud(id: number,model: SolicitudEstudioModel): Observable<SolicitudEstudioModel>{//Revisar retorno
    return this.http.get<SolicitudEstudioModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`)
  }
  eliminarSolicitud(id: number){//Revisar retorno
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${id}`);
  }
  obtenerSolicitudes():Observable<SolicitudEstudioModel[]>{//Sin filtro
    return this.http.get<SolicitudEstudioModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`)    
  }
  parcharSolicitudes(model: SolicitudEstudioModel):Observable<SolicitudEstudioModel>{//Sin filtro
    return this.http.patch<SolicitudEstudioModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerPagosSolicitud(id: number): Observable<PagosModel[]>{
    return this.http.get<PagosModel[]>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/pagos`)
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
