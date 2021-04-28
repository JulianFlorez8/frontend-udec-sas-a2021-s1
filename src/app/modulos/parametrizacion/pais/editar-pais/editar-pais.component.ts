import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';

@Component({
  selector: 'app-editar-pais',
  templateUrl: './editar-pais.component.html',
  styleUrls: ['./editar-pais.component.css']
})
export class EditarPaisComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  constructor(
    private fb: FormBuilder, 
    private service: PaisService,
    ) {}
    

  ngOnInit(): void {
    this.FormularioValidacion();
    this.llenarPaises();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      pais: ['', [Validators.required]],
      nombre: ['', [Validators.required]],

    });
  }

  RegitrarPais() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let pais = this.getPaisData();
      let codigo= this.fgv.pais.value;
      this.service.actualizarPais(codigo,pais).subscribe((data) => {
        console.log(data);
        if (data) {
          alert('Actualizacion Exitosa');
        } else {
          alert('Fallo el registro');
        }
      });
    }
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getPaisData(): PaisModel {
    let model = new PaisModel();
    model.codigo= this.fgv.pais.value;
    model.nombre = this.fgv.nombre.value;
    
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  
  llenarPaises(){
    this.service.obtenerPaises().subscribe(paises=>{
      //console.log(paises);

      //console.log(this.paises[0].nombre);
      const selectorPais=document.getElementById('pais');
      paises?.forEach(
        pais=>{
          const opcion= document.createElement('option');
          let nombrePais= pais.nombre;
          let codigoPais= pais.codigo;
          opcion.value = codigoPais.toString();
          opcion.text= nombrePais;
          if(selectorPais)
          {
            selectorPais.appendChild(opcion);
          }
        }
      )
     
    })
  }
}
