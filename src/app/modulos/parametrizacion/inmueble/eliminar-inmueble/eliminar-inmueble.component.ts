import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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


  suscripcion?: Subscription;
  fgValidator: FormGroup = this.fb.group({});
  inmuebles?: InmuebleModel[];
  objeto: string | undefined = '';
  constructor(
    private fb: FormBuilder, 
    private service: InmuebleService,
    private serviceSeguridad: SeguridadService
  ) { }

  ngOnInit(): void {
    this.FormularioValidacion();
    this.llenarInmuebles();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      inmueble: ['', [Validators.required]],
      
    });
  }

  eliminacionInmueble() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let inmueble = this.getInmuebleData();
      this.eliminarInmueble(inmueble);
    }
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getInmuebleData(): number {
    
    return this.fgv.inmueble.value;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  llenarInmuebles(){
    this.service.obtenerInmuebles().subscribe(inmuebles=>{
      //console.log(paises);
      this.inmuebles=inmuebles;
      //console.log(this.paises[0].nombre);
      const selectorProyecto=document.getElementById('inmueble');
      this.inmuebles?.forEach(
        inmueble=>{
          const opcion= document.createElement('option');
          let nombreinmueble= inmueble.identificador;
          let codigoinmueble= inmueble.codigo;
          if(codigoinmueble)
          {
            opcion.value = codigoinmueble.toString();
          opcion.text= nombreinmueble;
          }
          
          if(selectorProyecto)
          {
            selectorProyecto.appendChild(opcion);
          }
        }
      )
     
    })
  }
  
  eliminarInmueble(idInmueble: number){
    this.service.eliminarInmueble(idInmueble);
    
  }



}
