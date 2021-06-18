import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';

@Component({
  selector: 'app-editar-pais',
  templateUrl: './editar-pais.component.html',
  styleUrls: ['./editar-pais.component.css']
})
export class EditarPaisComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  elementoID: number=0;
  constructor(
    private fb: FormBuilder, 
    private service: PaisService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.elementoID= this.route.snapshot.params["codigo"];
    }
    

  ngOnInit(): void {
    this.FormularioValidacion();
    this.getPaisActual();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],

    });
  }
  getPaisActual(){
    this.service.obtenerPais(this.elementoID).subscribe(
      data =>{
        this.fgv.codigo.setValue(data.codigo);
        this.fgv.nombre.setValue(data.nombre);
       
      },
      error =>{
        alert('No se encontro el elemento');
       this.router.navigate(["/parametrizacion/listar-pais"]);
      }
    )

  }
  ActualizarPais() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let pais = this.getPaisData();
      this.service.actualizarPais(this.elementoID,pais).subscribe((data) => {
          alert('Actualizacion Exitosa');// LAS ACTUALIZACIONES NO RETORNAN NADA, ES DECIR LO QUE VIENE ES null
      });
    }
  
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getPaisData(): PaisModel {
    let model = new PaisModel();
    model.codigo= parseInt(this.fgv.pais.value);
    model.nombre = this.fgv.nombre.value;
    
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  
}
