import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InmuebleModel } from 'src/app/models/parametrizacion/inmueble.model';
import { InmuebleService } from 'src/app/services/parametrizacion/inmueble.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-eliminar-inmueble',
  templateUrl: './eliminar-inmueble.component.html',
  styleUrls: ['./eliminar-inmueble.component.css']
})
export class EliminarInmuebleComponent implements OnInit {
  
  constructor(
    private fb: FormBuilder, 
    private service: InmuebleService,
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
    this.service.eliminarInmueble(this.serviceSeguridad.getIdUniversal());
    
  }

}