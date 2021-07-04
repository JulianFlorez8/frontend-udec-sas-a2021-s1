import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProyectoModel } from 'src/app/models/parametrizacion/proyectos.model';
import { ProyectoService } from 'src/app/services/parametrizacion/proyecto.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-eliminar-proyecto',
  templateUrl: './eliminar-proyecto.component.html',
  styleUrls: ['./eliminar-proyecto.component.css']
})
export class EliminarProyectoComponent implements OnInit {
  constructor(
    private fb: FormBuilder, 
    private service: ProyectoService,
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
    this.service.eliminarProyecto(this.serviceSeguridad.getIdUniversal());
    
  }

}