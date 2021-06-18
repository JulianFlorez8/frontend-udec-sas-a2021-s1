import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BloqueModel } from 'src/app/models/parametrizacion/bloque.model';
import { ProyectoModel } from 'src/app/models/parametrizacion/proyectos.model';
import { BloqueService } from 'src/app/services/parametrizacion/bloque.service';
import { ProyectoService } from 'src/app/services/parametrizacion/proyecto.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-editar-bloque',
  templateUrl: './editar-bloque.component.html',
  styleUrls: ['./editar-bloque.component.css']
})
export class EditarBloqueComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  elementoID: number=0;
  constructor(
    private fb: FormBuilder, 
    private service: BloqueService,
    private serviceSeguridad: SeguridadService,
    private servicioProyectos: ProyectoService, 
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.elementoID= this.route.snapshot.params["codigo"];
    }

  ngOnInit(): void {
    this.FormularioValidacion();
    this.getBloqueActual();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      proyecto: ['', [Validators.required]],
    });
  }
  ActualizarBloque() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let bloque =  this.getBloqueData();
      this.service.actualizarBloque(this.elementoID,bloque).subscribe((data) => {
        console.log(data);
        if (data) {
          alert('Cambio Exitoso');
        } else {
          alert('Fallo el registro');
        }
      });
    }
  }
  getBloqueActual(){
    this.service.obtenerBloque(this.elementoID).subscribe(
      data =>{
        this.fgv.codigo.setValue(data.codigo);
        this.fgv.nombre.setValue(data.nombre);
        this.fgv.descripcion.setValue(data.descripcion);
        this.fgv.proyecto.setValue(data.codigoProyecto);
        
      },
      error =>{
        alert('No se encontro el elemento');
       this.router.navigate(["/parametrizacion/listar-bloque"]);
     
      }
    )
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getBloqueData(): BloqueModel {
    let model = new BloqueModel();
    model.codigo=parseInt(this.fgv.codigo.value);
    model.nombre = this.fgv.nombre.value;
    model.descripcion= this.fgv.descripcion.value;
    model.codigoProyecto=parseInt(this.fgv.proyecto.value);
 
    
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  

}
