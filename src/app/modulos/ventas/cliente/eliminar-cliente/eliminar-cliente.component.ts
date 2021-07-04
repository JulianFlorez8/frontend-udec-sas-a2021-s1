import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClienteModel } from 'src/app/models/ventas/cliente.model';
import { ClienteService } from 'src/app/services/ventas/cliente.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css'],
})
export class EliminarClienteComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: ClienteService,
    private serviceSeguridad: SeguridadService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
    }
    elementoID?: number;
    elemento?: string;
    suscripcion?: Subscription;
  ngOnInit(): void {
    this.suscripcion = this.serviceSeguridad.getDatosUsuario().subscribe((data) => {
      this.elementoID=data.codigo;
      this.elemento=data.elemento;
    });
  }
  eliminarElemento(){
    console.log("Eliminando "+ this.serviceSeguridad.getElementoUniversal())
    this.service.eliminarCliente(this.serviceSeguridad.getIdUniversal());
    
  }

}