import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';

@Component({
  selector: 'app-editar-ciudad',
  templateUrl: './editar-ciudad.component.html',
  styleUrls: ['./editar-ciudad.component.css'],
})
export class EditarCiudadComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  elementoID: number=0;
  paises?: PaisModel[];
  constructor(
    private fb: FormBuilder,
    private service: CiudadService,
    private servicioPaises: PaisService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.elementoID= this.route.snapshot.params["codigo"];
    }

  ngOnInit(): void {
    this.FormularioValidacion();
    this.getCiudadActual();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      codigoPais: ['', [Validators.required]],
    });
  }

  ActualizarCiudad() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let ciudad = this.getCiudadData();
      this.service.actualizarCiudad(this.elementoID, ciudad).subscribe((data) => {
        console.log(data);
        if (data) {
          alert('Actualizacion Exitosa');
        } else {
          alert('Fallo el registro');
        }
      });
    }
  }
  getCiudadActual(){
    this.service.obtenerCiudad(this.elementoID).subscribe(
      data =>{
        this.fgv.codigo.setValue(data.codigo);
        this.fgv.nombre.setValue(data.nombre);
        this.fgv.codigoPais.setValue(data.codigoPais);
      },
      error =>{
        alert('No se encontro el elemento');
        this.router.navigate(["/parametrizacion/listar-ciudad"]);
      }
    )
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getCiudadData(): CiudadModel {
    let model = new CiudadModel();
    model.codigo = parseInt(this.fgv.codigo.value);
    model.nombre = this.fgv.nombre.value;
    model.codigoPais = parseInt(this.fgv.codigoPais.value);
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }

}
