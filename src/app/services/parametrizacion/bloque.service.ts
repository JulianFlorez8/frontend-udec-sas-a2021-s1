import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service.config';
import { BloqueModel } from 'src/app/models/parametrizacion/bloque.model';
import { ProyectoModel } from 'src/app/models/parametrizacion/proyectos.model';
import { SeguridadService } from '../seguridad/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {
  token:String='';
  entity:String ='bloques';
  cuenta: String= 'bloques/count';
  constructor(
    private http: HttpClient,
    private servicioSeguridad: SeguridadService
  ) { 
    this.token= this.servicioSeguridad.getToken() 
  }
  creacionBloque( model: BloqueModel): Observable <BloqueModel>{
    
    return this.http.post<BloqueModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }
  obtenerCantidadBloques(): Observable<number>{
    return this.http.get<number>(`${ServiceConfig.BASE_URL}${this.cuenta}`)
  }
  actualizarBloque(id: number,model: BloqueModel): Observable<BloqueModel>{//Revisar retorno
    return this.http.put<BloqueModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }
  parcharBloque(id: number,model: BloqueModel): Observable<BloqueModel>{//Revisar retorno
    return this.http.patch<BloqueModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerBloque(id: number,model: BloqueModel): Observable<BloqueModel>{//Revisar retorno
    return this.http.get<BloqueModel>( `${ServiceConfig.BASE_URL}${this.entity}/${id}`)
  }
  eliminarBloque(id: number){//Revisar retorno
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${id}`);
  }
  obtenerBloques():Observable<BloqueModel[]>{//Sin filtro
    return this.http.get<BloqueModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`)    
  }
  parcharUsuarios(model: BloqueModel):Observable<BloqueModel>{//Sin filtro
    return this.http.patch<BloqueModel>( `${ServiceConfig.BASE_URL}${this.entity}`, model, {
      headers: new HttpHeaders({})
    })
  }
  obtenerProyectoBloque(id : number):Observable<ProyectoModel>{//_Me devuelve el proyecto al que pertenece un bloque
    return this.http.get<ProyectoModel>(`${ServiceConfig.BASE_URL}${this.entity}/${id}/proyectos`)    
  }

}
