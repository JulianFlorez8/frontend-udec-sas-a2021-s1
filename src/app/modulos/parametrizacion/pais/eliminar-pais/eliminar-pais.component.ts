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
      selectorProyecto.innerText="¿Seguro desea eliminar al pais  "+ this.elementoID+ " ?";
    }
  }
  eliminarPais(){
    this.service.eliminarPais(parseInt(this.elementoID));
    
  }
}
