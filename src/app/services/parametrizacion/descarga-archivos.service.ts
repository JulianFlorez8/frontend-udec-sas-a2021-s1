import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service.config';
import { ArchivoModel } from 'src/app/models/archivos/archivo.model';
@Injectable({
  providedIn: 'root'
})
export class DescargaArchivosService {
  entity:String ='fileRuta';
  constructor(
    private http: HttpClient
  ) { }//1 PROYECTO 2 CLIENTE 3 PAGO
  descargarArchivo(tipo: number, nombreArchivo: string):Observable<string>{
    return this.http.get<string>( `${ServiceConfig.BASE_URL}${this.entity}/${tipo}/${nombreArchivo}`, {
      headers: new HttpHeaders({})
    })

  }
}
