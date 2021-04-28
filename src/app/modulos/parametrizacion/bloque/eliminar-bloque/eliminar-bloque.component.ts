import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BloqueModel } from 'src/app/models/parametrizacion/bloque.model';
import { BloqueService } from 'src/app/services/parametrizacion/bloque.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-eliminar-bloque',
  templateUrl: './eliminar-bloque.component.html',
  styleUrls: ['./eliminar-bloque.component.css']
})
export class EliminarBloqueComponent implements OnInit {

  suscripcion?: Subscription;
  fgValidator: FormGroup = this.fb.group({});
  bloques?: BloqueModel[];
  objeto: string | undefined = '';
  constructor(
    private fb: FormBuilder, 
    private service: BloqueService,
    private serviceSeguridad: SeguridadService
  ) { }

  ngOnInit(): void {
    this.FormularioValidacion();
    this.llenarBloques();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      bloque: ['', [Validators.required]],
      
    });
  }

  eliminacionBloque() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let bloque = this.getBloqueData();
      this.eliminarBloque(bloque);
    }
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getBloqueData(): number {
    
    return this.fgv.bloque.value;
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
  
  eliminarBloque(idBloque: number){
    this.service.eliminarBloque(idBloque);
    
  }

}
