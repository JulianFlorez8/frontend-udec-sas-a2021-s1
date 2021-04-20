import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupName, AbstractFormGroupDirective } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import{ UsuarioModel} from '../../../modelos/usuario.model'
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  
  

  fgValidator: FormGroup;


  constructor(
    private fb: FormBuilder,
    private service: UsuariosService
  ) { }

  ngOnInit(): void {
    this.FormularioValidacion();
  }
  FormularioValidacion(){
    this.fgValidator= this.fb.group({
      nombre:new FormControl(['',[Validators.required, Validators.minLength(5)]]),
      apellido1:new FormControl(['',[Validators.required, Validators.minLength(5)]]),
      apellido2:new FormControl(['',[Validators.required, Validators.minLength(5)]]),
      correo:new FormControl(['',[Validators.required, Validators.email]]),
      celular:new FormControl(['',[Validators.required, Validators.minLength(5)]]),
      rol:new FormControl(['',[Validators.required, Validators.minLength(5)]]),
      usuario:new FormControl(['',[Validators.required, Validators.minLength(5)]]),
      ciudad:new FormControl(['',[Validators.required, Validators.minLength(5)]]),
    })
  }

  RegitrarUsuario() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let usuario= this.getUsuarioData();
      this.service.creacionUsuarios(usuario).subscribe(data => {
        console.log(data);
        if(data){
          alert('Registro Exitoso, contraseña enviada a su correo electronico');
        }
        else{
          alert('Fallo el registro');
        }
      });
      
    }
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getUsuarioData(): UsuarioModel{
    let model= new UsuarioModel();
        model.nombre= this.fgv.nombre.value;
      model.apellido1= this.fgv.apellido1.value;
      model.apellido2= this.fgv.apellido2.value;
      model.correo= this.fgv.correo.value;
      model.celular= this.fgv.celular.value;
      model.rol= this.fgv.rol.value;
      model.usuario= this.fgv.usuario.value;
      model.ciudad= this.fgv.ciudad.value;
      return model;
  }
  get fgv(){
    return this.fgValidator.controls;
  }
}
