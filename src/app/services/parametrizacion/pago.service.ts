import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service.config';
import { PagosModel } from 'src/app/models/parametrizacion/pagos.model';
import { SolicitudEstudioModel } from 'src/app/models/parametrizacion/solicitudEstudio.model';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  entity:String ='pagos';
  cuenta: String= 'pagos/count';
  constructor(
    private http: HttpClient
  ) { }
  creacionPago( model: PagosModel): Observable <PagosModel>{
    return this.http.post<PagosModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerCantidadPagos(): Observable<number>{
    return this.http.get<number>(`${ServiceConfig.BASE_URL}${this.cuenta}`)
  }
  actualizarPago(id: number,model: PagosModel): Observable<PagosModel>{//Revisar retorno
    return this.http.put<PagosModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({})
    })
  }
  parcharPago(id: number,model: PagosModel): Observable<PagosModel>{//Revisar retorno
    return this.http.patch<PagosModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerPago(id: number,model: PagosModel): Observable<PagosModel>{//Revisar retorno
    return this.http.get<PagosModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`)
  }
  eliminarPago(id: number){//Revisar retorno
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${id}`);
  }
  obtenerPagos():Observable<PagosModel[]>{//Sin filtro
    return this.http.get<PagosModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`)    
  }
  parcharPagos(model: PagosModel):Observable<PagosModel>{//Sin filtro
    return this.http.patch<PagosModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerSolicitudPago(id: number): Observable<SolicitudEstudioModel>{//me dice a q bloque pertenece un inmueble
    return this.http.get<SolicitudEstudioModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/solicitud-estudio`)
  }
}
