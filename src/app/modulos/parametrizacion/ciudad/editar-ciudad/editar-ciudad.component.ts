import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';

@Component({
  selector: 'app-editar-ciudad',
  templateUrl: './editar-ciudad.component.html',
  styleUrls: ['./editar-ciudad.component.css']
})
export class EditarCiudadComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});

  paises?: PaisModel[];
  constructor(
    private fb: FormBuilder, 
    private service: CiudadService,
    private servicioPaises: PaisService,
    ) {}
    

  ngOnInit(): void {
    this.FormularioValidacion();
    this.llenarPaises();
    this.llenarCiudades();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      ciudad:['', [Validators.required]],
      nombre: ['', [Validators.required]],
      codigoPais: ['', [Validators.required]],
    });
  }

  RegitrarCiudad() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let ciudad = this.getCiudadData();
      let codigo= this.fgv.ciudad.value;
      this.service.actualizarCiudad(codigo,ciudad).subscribe((data) => {
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
  getCiudadData(): CiudadModel {
    let model = new CiudadModel();
    model.codigo= parseInt(this.fgv.ciudad.value);
    model.nombre = this.fgv.nombre.value;
    model.codigoPais= parseInt(this.fgv.codigoPais.value);
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  
  llenarPaises(){
    this.servicioPaises.obtenerPaises().subscribe(paises=>{
      //console.log(paises);
      this.paises=paises;
      //console.log(this.paises[0].nombre);
      const selectorPais=document.getElementById('pais');
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
  }
  llenarCiudades(){
    this.service.obtenerCiudades().subscribe(ciudades=>{
      //console.log(paises);
     
      //console.log(this.paises[0].nombre);
      const selectorPais=document.getElementById('ciudad');
      ciudades?.forEach(
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
  }
  }
  