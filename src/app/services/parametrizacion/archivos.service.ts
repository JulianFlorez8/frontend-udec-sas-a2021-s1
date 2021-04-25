import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service.config';
import { CargaArchivoModel } from 'src/app/models/archivos/imagen.model';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
  entity:String ='CargarImagen';

  constructor(
    private http: HttpClient
  ) { }
  cargarImagen(clase: String, formData: FormData): Observable<CargaArchivoModel>{//Solo funciona si le entra "Proyecto o Cliente"
    return this.http.post<CargaArchivoModel>( `${ServiceConfig.BASE_URL}${this.entity}${clase}`,formData, {
      headers: new HttpHeaders({})
    })

  }
}
