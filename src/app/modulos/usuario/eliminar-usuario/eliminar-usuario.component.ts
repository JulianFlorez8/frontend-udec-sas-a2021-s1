import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {

  suscripcion?: Subscription;
  fgValidator: FormGroup = this.fb.group({});
  usuarios?: UsuarioModel[];
  objeto: string | undefined = '';
  constructor(
    private fb: FormBuilder, 
    private service: UsuariosService,
    private serviceSeguridad: SeguridadService
  ) { }

  ngOnInit(): void {
    this.FormularioValidacion();
    this.llenarUsuarios();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      usuario: ['', [Validators.required]],
      
    });
  }

  eliminacionUsuario() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let usuario = this.getUsuarioData();
      this.eliminarUsuario(usuario);
    }
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getUsuarioData(): number {
    
    return this.fgv.usuario.value;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  llenarUsuarios(){
    this.service.obtenerUsuarios().subscribe(usuarios=>{
      //console.log(paises);
      this.usuarios=usuarios;
      //console.log(this.paises[0].nombre);
      const selectorProyecto=document.getElementById('usuario');
      this.usuarios?.forEach(
        usuario=>{
          const opcion= document.createElement('option');
          let nombreusuario= usuario.Nombre;
          let codigousuario= usuario.Documento;
          if(codigousuario)
          {
            opcion.value = codigousuario.toString();
          opcion.text= nombreusuario;
          }
          
          if(selectorProyecto)
          {
            selectorProyecto.appendChild(opcion);
          }
        }
      )
     
    })
  }
  
  eliminarUsuario(idUsuario: number){
    this.service.eliminarUsuario(idUsuario);
    
  }

}

