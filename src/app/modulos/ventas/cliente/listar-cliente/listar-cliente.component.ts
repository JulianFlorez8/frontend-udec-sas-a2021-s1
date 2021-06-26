import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClienteModel } from 'src/app/models/ventas/cliente.model';
import { ClienteService } from 'src/app/services/ventas/cliente.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  constructor(
    private service: ClienteService,
    private secService: SeguridadService
  ) {}
  lista: ClienteModel[] = [];

  suscripcion?: Subscription;
  rol: string | undefined = '';
  ngOnInit(): void {
    this.obtenerLista();
    this.suscripcion = this.secService.getDatosUsuario().subscribe((data) => {
      this.rol = data.usuario?.Rol;
    });
  }

  obtenerLista() {
    this.service.obtenerClientes().subscribe(
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
}
