import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BloqueModel } from 'src/app/models/parametrizacion/bloque.model';
import { ProyectoModel } from 'src/app/models/parametrizacion/proyectos.model';
import { BloqueService } from 'src/app/services/parametrizacion/bloque.service';
import { ProyectoService } from 'src/app/services/parametrizacion/proyecto.service';

@Component({
  selector: 'app-crear-bloque',
  templateUrl: './crear-bloque.component.html',
  styleUrls: ['./crear-bloque.component.css']
})
export class CrearBloqueComponent implements OnInit {

  fgValidator: FormGroup = this.fb.group({});

  proyectos?: ProyectoModel[];
  constructor(
    private fb: FormBuilder, 
    private service: BloqueService,
    private servicioProyectos: ProyectoService,
    ) {}
    

  ngOnInit(): void {
    this.FormularioValidacion();
    this.llenarProyectos();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      proyecto: ['', [Validators.required]],
      
    });
  }

  RegitrarBloque() {
    if (this.fgValidator.invalid) {
        alert('Formulario Invalido');
    } else {
      let bloque = this.getBloqueData();
      console.log(bloque);
      this.service.creacionBloque(bloque).subscribe((data) => {
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
  getBloqueData(): BloqueModel {
    let model = new BloqueModel();
    model.nombre = this.fgv.nombre.value;
    model.descripcion= this.fgv.descripcion.value;
    model.codigoProyecto= parseInt(this.fgv.proyecto.value);
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
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

