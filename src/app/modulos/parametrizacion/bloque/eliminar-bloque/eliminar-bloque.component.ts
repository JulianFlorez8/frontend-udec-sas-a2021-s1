import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BloqueModel } from 'src/app/models/parametrizacion/bloque.model';
import { BloqueService } from 'src/app/services/parametrizacion/bloque.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-eliminar-bloque',
  templateUrl: './eliminar-bloque.component.html',
  styleUrls: ['./eliminar-bloque.component.css']
})
export class EliminarBloqueComponent implements OnInit {
  constructor(
    private fb: FormBuilder, 
    private service: BloqueService,
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
      selectorProyecto.innerText="¿Seguro desea eliminar al Bloque  "+ this.elementoID+ " ?";
    }
  }
  eliminarBloque(){
    this.service.eliminarBloque(parseInt(this.elementoID));
    
  }
}
