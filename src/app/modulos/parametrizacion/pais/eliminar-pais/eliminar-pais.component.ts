import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  suscripcion?: Subscription;
  fgValidator: FormGroup = this.fb.group({});
  paises?: PaisModel[];
  objeto: string | undefined = '';
  constructor(
    private fb: FormBuilder, 
    private service: PaisService,
    private serviceSeguridad: SeguridadService
  ) { }

  ngOnInit(): void {
    this.FormularioValidacion();
    this.llenarPaiss();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      pais: ['', [Validators.required]],
      
    });
  }

  eliminacionPais() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let pais = this.getPaisData();
      this.eliminarPais(pais);
    }
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getPaisData(): number {
    
    return this.fgv.pais.value;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  llenarPaiss(){
    this.service.obtenerPaises().subscribe(paises=>{
      //console.log(paises);
      this.paises=paises;
      //console.log(this.paises[0].nombre);
      const selectorProyecto=document.getElementById('pais');
      this.paises?.forEach(
        pais=>{
          const opcion= document.createElement('option');
          let nombrepais= pais.nombre;
          let codigopais= pais.codigo;
          if(codigopais)
          {
            opcion.value = codigopais.toString();
          opcion.text= nombrepais;
          }
          
          if(selectorProyecto)
          {
            selectorProyecto.appendChild(opcion);
          }
        }
      )
     
    })
  }
  
  eliminarPais(idPais: number){
    this.service.eliminarPais(idPais);
    
  }




}
