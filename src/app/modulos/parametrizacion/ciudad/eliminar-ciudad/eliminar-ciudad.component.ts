import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
import { BloqueService } from 'src/app/services/parametrizacion/bloque.service';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-eliminar-ciudad',
  templateUrl: './eliminar-ciudad.component.html',
  styleUrls: ['./eliminar-ciudad.component.css'],
})
export class EliminarCiudadComponent implements OnInit {
  
  constructor(
    private fb: FormBuilder,
    private service: CiudadService,
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
    this.service.eliminarCiudad(this.serviceSeguridad.getIdUniversal());
    
  }

}