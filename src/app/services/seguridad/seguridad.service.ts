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
      sesion.codigo=0;
      sesion.elemento='';
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
  getUsuario(){
    let actualSesion = this.getSesion();
    if(actualSesion)
    {
      return JSON.parse(actualSesion).usuario;

    }
  }
  getDocumento(): number {
    let actualSesion = this.getSesion();
    if(actualSesion)
    {
      return JSON.parse(actualSesion).usuario.Documento;

    }
    else{
      return 0;
    }
  }
  getIdUniversal(): number{
    let actualSesion= this.getSesion();
    if(actualSesion)
    {
      return JSON.parse(actualSesion).codigo;
    }
    else{
      return 0
    }
  }
  getElementoUniversal(): string{
    let actualSesion= this.getSesion();
    if(actualSesion)
    {
      return JSON.parse(actualSesion).elemento;
    }
    else{
      return '';
    }
  }
  setIdUnivesal(idNuevo: number, elementoNuevo: string){
    let x= new  InicioModel;
    
    x.logeado=true;
    x.token=this.getToken();
    x.usuario=this.getUsuario();
    x.codigo=idNuevo;
    x.elemento=elementoNuevo;
    localStorage.setItem('session', JSON.stringify(x));
    if(x.usuario)
    console.log("id guardado es: "+x.codigo+" "+x.elemento);

  }
}
