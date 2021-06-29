import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupName,
  AbstractFormGroupDirective,
} from '@angular/forms';
import { ArchivosService } from 'src/app/services/parametrizacion/archivos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioModel } from '../../../models/usuario.model';
import{ CiudadService} from 'src/app/services/parametrizacion/ciudad.service';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  codigoPais?: string;
  paises?: PaisModel[];
  ciudades?: CiudadModel[];
  constructor(
    private servicioSubida: ArchivosService,
    private fb: FormBuilder, 
    private service: UsuariosService,
    private servicioCiudades: CiudadService,
    private servicioPaises: PaisService
    ) {}
    

  ngOnInit(): void {
    this.FormularioValidacion();
    this.llenarPaises();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido1: ['', [Validators.required]],
      apellido2: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      pais:['',[Validators.required]],
      ciudad: ['', [Validators.required]],
    });
  }

  RegitrarUsuario() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let usuario = this.getUsuarioData();
      this.service.creacionUsuarios(usuario).subscribe((data) => {
        console.log(data);
        if (data) {
          alert('Registro Exitoso, contraseña enviada a su correo electronico');
        } else {
          alert('Fallo el registro');
        }
      });
    }
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getUsuarioData(): UsuarioModel {
    let model = new UsuarioModel();
    model.Nombre = this.fgv.nombre.value;
    model.Apellido_1 = this.fgv.apellido1.value;
    model.Apellido_2 = this.fgv.apellido2.value;
    model.Documento = this.fgv.documento.value;
    model.Correo = this.fgv.correo.value;
    model.Celular = this.fgv.celular.value.toString();
    model.Rol = this.fgv.rol.value;
    model.Usuario = this.fgv.usuario.value;
    model.Contrasena = '';
    let pais=this.fgv.pais.value;
    model.Ciudad = this.fgv.ciudad.value;
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  llenarPaises(){
      this.servicioPaises.obtenerPaises().subscribe((paises)=>{
        this.paises=paises
      });
      
      const selectorPais=document.getElementById('pais');
      if (selectorPais)
      {
        selectorPais.addEventListener('change', e => { //me permite ver cuando estoy cambiando de opcion
          const list = e.target;
          let idPais=this.fgv.pais.value;
          this.ciudades=[];
          //this.busquedaPais(idPais);//NO USAR ACTUALMENTE, DEMASIADO PESADA LA BUSQUEDA
          this.llenarCiudades(idPais);
    })
      }
    }
    llenarCiudades(id:number){
      this.servicioPaises.obtenerCiudadesPais(id).subscribe(ciudades=>{
        this.ciudades=ciudades;
        
    });
  }

}
