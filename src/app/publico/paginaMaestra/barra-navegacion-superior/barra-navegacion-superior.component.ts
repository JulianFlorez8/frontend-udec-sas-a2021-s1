import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-barra-navegacion-superior',
  templateUrl: './barra-navegacion-superior.component.html',
  styleUrls: ['./barra-navegacion-superior.component.css'],
})
export class BarraNavegacionSuperiorComponent implements OnInit {
  logeado: Boolean = false;
  suscripcion?: Subscription;
  rol: string | undefined = '';
  nombreC: string | undefined = '';
  constructor(private service: SeguridadService) {}

  ngOnInit(): void {
    this.suscripcion = this.service.getDatosUsuario().subscribe((data) => {
      this.logeado = data.logeado;
      this.rol = data.usuario?.Rol;
      this.nombreC = `${data.usuario?.Nombre} ${data.usuario?.Apellido_1} ${data.usuario?.Apellido_2}`;
      console.log(this.nombreC);
    });
  }
}
