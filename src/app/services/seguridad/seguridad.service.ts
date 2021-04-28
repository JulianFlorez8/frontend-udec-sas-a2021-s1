import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CredencialesModel } from 'src/app/models/seguridad/credenciales.model';
import { InicioModel } from 'src/app/models/seguridad/Inicio.model';
import{ ServiceConfig} from '../../config/service.config';
@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  entity: String= 'identificar';
  datosUsuario= new BehaviorSubject<InicioModel>(new InicioModel());
  constructor(
    private http: HttpClient
  ) { 
    this.verificarSesionActiva();
  }
 
  setDatosUsuario(value:InicioModel){
    this.datosUsuario.next(value);
  }
  getDatosUsuario(){
    return this.datosUsuario.asObservable();
  }
  ingresoUsuarios( Credenciales: CredencialesModel): Observable<InicioModel>{
    return this.http.post<InicioModel>( `${ServiceConfig.BASE_URL}${this.entity}`, Credenciales, {
      headers: new HttpHeaders()
    })
  }
  guardarSesion(sesion: InicioModel): Boolean{
    let actualSesion = localStorage.getItem('session')
    if(actualSesion)
    {
      return false;
    }else{
      sesion.logeado=true;
      localStorage.setItem('session', JSON.stringify(sesion))
      this.setDatosUsuario(sesion);
      return true;
    }
  }
  getSesion(){
    let actualSesion= localStorage.getItem('session');
    return actualSesion;
  }
  CerrarSesion(){
    localStorage.removeItem('session');
    this.setDatosUsuario(new InicioModel());
  }
  verificarSesionActiva(){
    let sesionActiva= this.getSesion();
    if (sesionActiva)
    {
      let datosUsuario= JSON.parse(sesionActiva);
      this.setDatosUsuario(datosUsuario);
    }
  }
  getToken(): String {
    let actualSesion = this.getSesion();
    if(actualSesion)
    {
      return JSON.parse(actualSesion).token;

    }
    else{
      return '';
    }
    
  }
}
