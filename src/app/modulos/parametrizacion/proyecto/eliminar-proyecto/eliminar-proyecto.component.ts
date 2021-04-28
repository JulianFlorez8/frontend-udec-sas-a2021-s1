import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProyectoModel } from 'src/app/models/parametrizacion/proyectos.model';
import { ProyectoService } from 'src/app/services/parametrizacion/proyecto.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-eliminar-proyecto',
  templateUrl: './eliminar-proyecto.component.html',
  styleUrls: ['./eliminar-proyecto.component.css']
})
export class EliminarProyectoComponent implements OnInit {


  suscripcion?: Subscription;
  fgValidator: FormGroup = this.fb.group({});
  proyectos?: ProyectoModel[];
  objeto: string | undefined = '';
  constructor(
    private fb: FormBuilder, 
    private service: ProyectoService,
    private serviceSeguridad: SeguridadService
  ) { }

  ngOnInit(): void {
    this.FormularioValidacion();
    this.llenarProyectos();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      proyecto: ['', [Validators.required]],
      
    });
  }

  eliminacionProyecto() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let proyecto = this.getProyectoData();
      this.eliminarProyecto(proyecto);
    }
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getProyectoData(): number {
    
    return this.fgv.proyecto.value;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  llenarProyectos(){
    this.service.obtenerProyectos().subscribe(proyectos=>{
      //console.log(paises);
      this.proyectos=proyectos;
      //console.log(this.paises[0].nombre);
      const selectorProyecto=document.getElementById('proyecto');
      this.proyectos?.forEach(
        proyecto=>{
          const opcion= document.createElement('option');
          let nombreproyecto= proyecto.nombre;
          let codigoproyecto= proyecto.codigo;
          if(codigoproyecto)
          {
            opcion.value = codigoproyecto.toString();
          opcion.text= nombreproyecto;
          }
          
          if(selectorProyecto)
          {
            selectorProyecto.appendChild(opcion);
          }
        }
      )
     
    })
  }
  
  eliminarProyecto(idProyecto: number){
    this.service.eliminarProyecto(idProyecto);
    
  }

}


