import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloqueModel } from 'src/app/models/parametrizacion/bloque.model';
import { InmuebleModel } from 'src/app/models/parametrizacion/inmueble.model';
import { ProyectoModel } from 'src/app/models/parametrizacion/proyectos.model';
import { BloqueService } from 'src/app/services/parametrizacion/bloque.service';
import { InmuebleService } from 'src/app/services/parametrizacion/inmueble.service';
import { ProyectoService } from 'src/app/services/parametrizacion/proyecto.service';

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {

  fgValidator: FormGroup = this.fb.group({});
  proyectos?: ProyectoModel[];
  inmuebles?: InmuebleModel[];
  bloques?: BloqueModel[];
  elementoID: string='';
  constructor(
    private fb: FormBuilder, 
    private service: InmuebleService,
    private servicioBloques: BloqueService,
    private servicioProyectos: ProyectoService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.elementoID= this.route.snapshot.params["codigo"];
    }
    

  ngOnInit(): void {
    this.FormularioValidacion();
    this.getInmuebleActual();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      codigo: ['', [Validators.required]],
      identificador: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      codigoBloque: ['', [Validators.required]],
    });
  }

 
  //OBTENGO INFORMACION DEL QUE ESTOY EDITANDO
  getInmuebleActual(){
    this.service.obtenerInmueble(parseInt(this.elementoID)).subscribe(
      data =>{
        this.fgv.codigo.setValue(data.codigo);
        this.fgv.identificador.setValue(data.identificador);
        this.fgv.valor.setValue(data.valor);
        this.fgv.codigoBloque.setValue(data.codigoBloque);
      },
      error =>{
        alert('No se encontro el elemento');
       this.router.navigate(["/parametrizacion/listar-inmueble"]);
      }
    )
  }
  //Obtenego datos del formulario y los paso al modelo 
  getInmuebleData(): InmuebleModel {
    let model = new InmuebleModel();
    model.codigo=parseInt(this.fgv.codigo.value);
    model.identificador = this.fgv.identificador.value;
    model.valor = parseInt(this.fgv.valor.value);
    model.codigoBloque=parseInt(this.fgv.codigoBloque.value);
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  
  ActualizarInmueble() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let inmueble = this.getInmuebleData();
      let codigo= this.fgv.codigo.value;
      this.service.actualizarInmueble(codigo,inmueble).subscribe((data) => {
          alert('Actualizacion Exitosa');// LAS ACTUALIZACIONES NO RETORNAN NADA, ES DECIR LO QUE VIENE ES null
      });
    }
  }
}

  
