import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service.config';
import { BloqueModel } from 'src/app/models/parametrizacion/bloque.model';
import { InmuebleModel } from 'src/app/models/parametrizacion/inmueble.model';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {
  entity:String ='inmuebles';
  cuenta: String= 'inmuebles/count';
  constructor(
    private http: HttpClient
  ) { }
  creacionInmueble( model: InmuebleModel): Observable <InmuebleModel>{
    return this.http.post<InmuebleModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerCantidadInmueble(): Observable<number>{
    return this.http.get<number>(`${ServiceConfig.BASE_URL}${this.cuenta}`)
  }
  actualizarInmueble(id: number,model: InmuebleModel): Observable<InmuebleModel>{//Revisar retorno
    return this.http.put<InmuebleModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({})
    })
  }
  parcharInmueble(id: number,model: InmuebleModel): Observable<InmuebleModel>{//Revisar retorno
    return this.http.patch<InmuebleModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerInmueble(id: number,model: InmuebleModel): Observable<InmuebleModel>{//Revisar retorno
    return this.http.get<InmuebleModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`)
  }
  eliminarInmueble(id: number){//Revisar retorno
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${id}`);
  }
  obtenerInmuebles():Observable<InmuebleModel[]>{//Sin filtro
    return this.http.get<InmuebleModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`)    
  }
  parcharInmuebles(model: InmuebleModel):Observable<InmuebleModel>{//Sin filtro
    return this.http.patch<InmuebleModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerBloqueInmueble(id: number): Observable<BloqueModel>{//me dice a q bloque pertenece un inmueble
    return this.http.get<BloqueModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}/bloque`)
  }
  

}
