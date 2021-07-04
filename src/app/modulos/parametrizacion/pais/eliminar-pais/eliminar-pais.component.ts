import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-eliminar-pais',
  templateUrl: './eliminar-pais.component.html',
  styleUrls: ['./eliminar-pais.component.css']
})
export class EliminarPaisComponent implements OnInit {

  constructor(
    private fb: FormBuilder, 
    private service: PaisService,
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
    this.service.eliminarPais(this.serviceSeguridad.getIdUniversal());
    
  }

}
