import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

 
  suscripcion?: Subscription;
  fgValidator: FormGroup = this.fb.group({});
  bloques?: BloqueModel[];
  objeto: string | undefined = '';
  proyectos?: ProyectoModel[];
  constructor(
    private fb: FormBuilder, 
    private service: BloqueService,
    private serviceSeguridad: SeguridadService,
    private servicioProyectos: ProyectoService
  ) { }

  ngOnInit(): void {
    this.FormularioValidacion();
    this.llenarBloques();
    this.llenarProyectos();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      bloque: ['', [Validators.required]],
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
      let idBloque= this.fgv.bloque.value;
      console.log(bloque);
      
      this.service.actualizarBloque(idBloque,bloque).subscribe((data) => {
        console.log(data);
        if (data) {
          alert('Cambio Exitoso');
        } else {
          alert('Fallo el registro');
        }
      });
    }
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getBloqueData(): BloqueModel {
    let model = new BloqueModel();
    model.codigo=parseInt(this.fgv.bloque.value);
    model.nombre = this.fgv.nombre.value;
    model.descripcion= this.fgv.descripcion.value;
    model.codigoProyecto=parseInt(this.fgv.proyecto.value);
 
    
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  llenarBloques(){
    this.service.obtenerBloques().subscribe(bloques=>{
      //console.log(paises);
      this.bloques=bloques;
      //console.log(this.paises[0].nombre);
      const selectorProyecto=document.getElementById('bloque');
      this.bloques?.forEach(
        bloque=>{
          const opcion= document.createElement('option');
          let nombrebloque= bloque.nombre;
          let codigobloque= bloque.codigo;
          if(codigobloque)
          {
            opcion.value = codigobloque.toString();
          opcion.text= nombrebloque;
          }
          
          if(selectorProyecto)
          {
            selectorProyecto.appendChild(opcion);
          }
        }
      )
     
    })
  }
  llenarProyectos(){
    this.servicioProyectos.obtenerProyectos().subscribe(proyectos=>{
      //console.log(paises);
      this.proyectos=proyectos;
      //console.log(this.paises[0].nombre);
      const selectorProyecto=document.getElementById('proyecto');
      this.proyectos?.forEach(
        proyectos=>{
          const opcion= document.createElement('option');
          let nombreProyectos= proyectos.nombre;
          let codigoProyectos= proyectos.codigo;
          if(codigoProyectos)
          {
            opcion.value = codigoProyectos.toString();
          opcion.text= nombreProyectos;
          }
          
          if(selectorProyecto)
          {
            selectorProyecto.appendChild(opcion);
          }
        }
      )
     
    })
  }
  

}
