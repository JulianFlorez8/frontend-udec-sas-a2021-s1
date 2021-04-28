import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';

@Component({
  selector: 'app-crear-pais',
  templateUrl: './crear-pais.component.html',
  styleUrls: ['./crear-pais.component.css']
})
export class CrearPaisComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  constructor(
    private fb: FormBuilder, 
    private service: PaisService,
    ) {}
    

  ngOnInit(): void {
    this.FormularioValidacion();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      nombre: ['', [Validators.required]],

    });
  }

  RegitrarPais() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let pais = this.getPaisData();
      this.service.creacionPais(pais).subscribe((data) => {
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
  getPaisData(): PaisModel {
    let model = new PaisModel();
    model.nombre = this.fgv.nombre.value;
    
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
}
