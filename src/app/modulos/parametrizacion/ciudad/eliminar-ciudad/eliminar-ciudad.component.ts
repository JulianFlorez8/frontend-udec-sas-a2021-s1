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
      selectorProyecto.innerText="¿Seguro desea eliminar la Ciudad  "+ this.elementoID+ " ?";
    }
  }
  eliminarCiudad(){
    this.service.eliminarCiudad(parseInt(this.elementoID));
    
  }
}