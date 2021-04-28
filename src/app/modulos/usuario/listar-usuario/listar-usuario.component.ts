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
    private secService: SeguridadService
  ) {}
  lista: UsuarioModel[] = [];

  suscripcion?: Subscription;
  rol: string | undefined = '';
  ngOnInit(): void {
    this.obtenerLista();
    this.suscripcion = this.secService.getDatosUsuario().subscribe((data) => {
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
}
