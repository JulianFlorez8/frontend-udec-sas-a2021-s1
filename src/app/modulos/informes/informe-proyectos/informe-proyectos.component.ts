import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';

@Component({
  selector: 'app-informe-proyectos',
  templateUrl: './informe-proyectos.component.html',
  styleUrls: ['./informe-proyectos.component.css']
})
export class InformeProyectosComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  paises?: PaisModel[];
  constructor(
    
    private fb: FormBuilder, 
    private service: CiudadService,
    private servicioPaises: PaisService,
    ) {}
  ngOnInit(): void {
    this.llenarPaises();
    this.FormularioValidacion();
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      pais: ['', [Validators.required]]
    });
  }
  
  llenarPaises(){
    const selectorPais=document.getElementById('pais');
    this.servicioPaises.obtenerPaises().subscribe(paises=>{
      this.paises=paises;
      this.paises?.forEach(
        pais=>{
          const opcion= document.createElement('option');
          let nombrePais= pais.nombre;
          let codigoPais= pais.codigo;
          if (codigoPais)
          {
             opcion.value = codigoPais.toString();
          opcion.text= nombrePais;

          }
          if(selectorPais)
          {
            selectorPais.appendChild(opcion);
          }
        }
      )
     
    })
    if (selectorPais)
    {
      selectorPais.addEventListener('change', e => { //me permite ver cuando estoy cambiando de opcion
        const list = e.target;
        
        
        let idPais=this.fgv.pais.value
        //console.log(idPais);
        this.generarGrafica(idPais);
  })
    }
  }
  generarGrafica(idPais: number){
    console.log(idPais);
    
  }
}
