import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';

@Component({
  selector: 'app-crear-ciudad',
  templateUrl: './crear-ciudad.component.html',
  styleUrls: ['./crear-ciudad.component.css']
})
export class CrearCiudadComponent implements OnInit {

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
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      nombre: ['', [Validators.required]],
      codigoPais: ['', [Validators.required]],
    });
  }

  RegitrarCiudad() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let ciudad = this.getCiudadData();
      this.service.creacionCiudad(ciudad).subscribe((data) => {
        console.log(data);
        if (data) {
          alert('Registro Exitoso');
        } else {
          alert('Fallo el registro');
        }
      });
    }
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getCiudadData(): CiudadModel {
    let model = new CiudadModel();
    model.nombre = this.fgv.nombre.value;
    model.codigoPais= parseInt(this.fgv.codigoPais.value);
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  
  llenarPaises(){
    
      this.servicioPaises.obtenerPaises().subscribe((paises)=>{
        this.paises=paises
      });
  
  }
  }
  