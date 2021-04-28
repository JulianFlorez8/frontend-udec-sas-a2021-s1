import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BloqueModel } from 'src/app/models/parametrizacion/bloque.model';
import { InmuebleModel } from 'src/app/models/parametrizacion/inmueble.model';
import { ProyectoModel } from 'src/app/models/parametrizacion/proyectos.model';
import { BloqueService } from 'src/app/services/parametrizacion/bloque.service';
import { InmuebleService } from 'src/app/services/parametrizacion/inmueble.service';
import { ProyectoService } from 'src/app/services/parametrizacion/proyecto.service';

@Component({
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {

  fgValidator: FormGroup = this.fb.group({});
  proyectos?: ProyectoModel[];
  bloques?: BloqueModel[];
  constructor(
    private fb: FormBuilder, 
    private service: InmuebleService,
    private servicioBloques: BloqueService,
    private servicioProyectos: ProyectoService,
    ) {}
    

  ngOnInit(): void {
    this.FormularioValidacion();
    this.llenarProyectos();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      identificador: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      proyecto:['', [Validators.required]],
      bloque:['', [Validators.required]],
    });
  }

  RegitrarInmueble() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let ciudad = this.getInmuebleData();
      this.service.creacionInmueble(ciudad).subscribe((data) => {
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
  getInmuebleData(): InmuebleModel {
    let model = new InmuebleModel();
    model.identificador = this.fgv.identificador.value;
    model.valor = this.fgv.valor.value;
    let proyecto= this.fgv.proyecto.value;
    model.codigoBloque = parseInt(this.fgv.bloque.value);
    
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
      if(selectorProyecto)
      {
        selectorProyecto.addEventListener('change', e => { //me permite ver cuando estoy cambiando de opcion
          const list = e.target;
        
          let idProyecto=this.fgv.proyecto.value
          console.log(idProyecto);
          this.llenarBloques(idProyecto);
    })

      }
     
    })
  }
  
  llenarBloques(idProyecto: number){
    this.servicioProyectos.obtenerBloquesProyecto(idProyecto).subscribe(bloques=>{
      console.log(bloques);
      this.bloques=bloques;
      //console.log(this.paises[0].nombre);
      const selectorBloque=document.getElementById('bloque');
      this.bloques?.forEach(
        bloque=>{
          const opcion= document.createElement('option');
          let nombreBloque= bloque.nombre;
          let codigoBloque= bloque.codigo;
          if (codigoBloque)
          {
            opcion.value = codigoBloque.toString();
            opcion.text= nombreBloque;
          }
          
          if(selectorBloque)
          {
            selectorBloque.appendChild(opcion);
          }
        }
      )
     
    })
  }
  }
  