import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuariosService } from '../../../services/usuarios.service';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css'],
})
export class ListarUsuarioComponent implements OnInit {
  constructor(
    private service: UsuariosService,
    private servicioSeguridad: SeguridadService
  ) {}
  lista: UsuarioModel[] = [];

  suscripcion?: Subscription;
  rol: string | undefined = '';
  ngOnInit(): void {
    this.obtenerLista();
    this.suscripcion = this.servicioSeguridad.getDatosUsuario().subscribe((data) => {
      this.rol = data.usuario?.Rol;
    });
  }

  obtenerLista() {
    this.service.obtenerUsuarios().subscribe(
      (datos) => {
        this.lista = datos;
        console.log(this.lista);
      },
      (error) => {
        console.log('error');
      }
    );
  }
  imprimirUsuario(id: any) {
    console.log(id);
  }
  ponerid(id:any, elemento: any){
    console.log("id:"+id);
    this.servicioSeguridad.setIdUnivesal(id,elemento);
    //EliminarPaisComponent.elemento="";
  }
}
