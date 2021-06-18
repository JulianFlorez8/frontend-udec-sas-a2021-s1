import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ArchivosService } from 'src/app/services/parametrizacion/archivos.service';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  codigoPais?: string;
  paises?: PaisModel[];
  ciudades?: CiudadModel[];
  usuarios?: UsuarioModel[];
  elementoID: string='';
  constructor(
    private servicioSubida: ArchivosService,
    private fb: FormBuilder, 
    private service: UsuariosService,
    private servicioCiudades: CiudadService,
    private servicioPaises: PaisService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.elementoID= this.route.snapshot.params["Documento"];
    }
    

  ngOnInit(): void {
    this.FormularioValidacion();
    this.obtenerUsuario();
    
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      Documento: ['', [Validators.required]],
      Nombre: ['', [Validators.required]],
      Apellido_1: ['', [Validators.required]],
      Apellido_2: ['', [Validators.required]],
      Correo: ['', [Validators.required, Validators.email]],
      Celular: ['', [Validators.required]],
      Rol: ['', [Validators.required]],
      Usuario: ['', [Validators.required]],
      pais:['',[Validators.required]],
      Ciudad: ['', [Validators.required]],
    });
  }
  //Obtengo informacion del que estoy editando
  obtenerUsuario(){
    this.service.obtenerUsuario(parseInt(this.elementoID)).subscribe(
      data =>{
        this.fgv.Documento.setValue(data.Documento);
        this.fgv.Nombre.setValue(data.Nombre);
        this.fgv.Apellido_1.setValue(data.Apellido_1);
        this.fgv.Apellido_2.setValue(data.Apellido_2);
        this.fgv.Correo.setValue(data.Correo);
        this.fgv.Celular.setValue(data.Celular);
        this.fgv.Rol.setValue(data.Rol);
        this.fgv.Usuario.setValue(data.Usuario);
        this.fgv.Ciudad.setValue(data.Ciudad);
        
      },
      error =>{
        this.router.navigate(["/usuario/listar-usuario"]);
      }
    )
  }

  editarUsuario() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let usuario = this.getUsuarioData();
      let cc= parseInt(this.fgv.usuario.value);
      this.service.actualizarUsuario(cc,usuario).subscribe((data) => {
        console.log(data);
        if (data) {
          alert('Actualizacion exitosa');
        } else {
          alert('Fallo el registro');
        }
      });
    }
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getUsuarioData(): UsuarioModel {
    let model = new UsuarioModel();
    model.Documento= parseInt(this.fgv.usuarioA.value);
    model.Nombre = this.fgv.nombre.value;
    model.Apellido_1 = this.fgv.apellido1.value;
    model.Apellido_2 = this.fgv.apellido2.value;
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
}
