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
      this.elementoID= this.route.snapshot.params["codigo"];
    }
    elementoID: string='';
  ngOnInit(): void {
    this.ponerValor();
  }
  ponerValor(){
    const selectorProyecto=document.getElementById('codigo');
    if( selectorProyecto)
    {
      selectorProyecto.innerText="¿Seguro desea eliminar al Proyecto  "+ this.elementoID+ " ?";
    }
  }
  eliminarProyecto(){
    this.service.eliminarProyecto(parseInt(this.elementoID));
    
  }
}