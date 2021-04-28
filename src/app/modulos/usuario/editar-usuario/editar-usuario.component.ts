import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(
    private servicioSubida: ArchivosService,
    private fb: FormBuilder, 
    private service: UsuariosService,
    private servicioCiudades: CiudadService,
    private servicioPaises: PaisService
    ) {}
    

  ngOnInit(): void {
    this.FormularioValidacion();
    this.llenarUsuarios();
    this.llenarPaises();
    
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      usuarioA: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido1: ['', [Validators.required]],
      apellido2: ['', [Validators.required]],
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
  llenarPaises(){
    this.servicioPaises.obtenerPaises().subscribe(paises=>{
      //console.log(paises);
      this.paises=paises;
      //console.log(this.paises[0].nombre);
      const selectorPais=document.getElementById('pais');
      this.paises?.forEach(
        pais=>{
          const opcion= document.createElement('option');
          let nombrePais= pais.nombre;
          let codigoPais= pais.codigo;
          if (codigoPais)
          {
             opcion.value = codigoPais.toString();
          opcion.text= nombrePais;

          }
          if(selectorPais)
          {
            selectorPais.appendChild(opcion);
          }
        }
      )
      if(selectorPais)
      {
        selectorPais.addEventListener('change', e => { //me permite ver cuando estoy cambiando de opcion
          const list = e.target;
        
          let idPais=this.fgv.pais.value
          console.log(idPais);
          this.llenarCiudades(idPais);
    })

      }
    })
  }
  
  llenarCiudades(idPais: number){//Entra como parametro el codigo del pais selecionado
    const selectorCiudad=document.getElementById('ciudad');
    //selectorCiudad.value=null;//RECETEAR EL SELECT

    this.servicioPaises.obtenerCiudadesPais(idPais).subscribe(ciudades=>{
      console.log(ciudades);
      this.ciudades=ciudades;
      console.log(this.ciudades[0].nombre);
      
      this.ciudades?.forEach(
        ciudad=>{
          const opcion= document.createElement('option');
          let nombreCiudad= ciudad.nombre;
          let codigoCiudad= ciudad.codigo;
          if (codigoCiudad)
          {
            opcion.value = codigoCiudad.toString();
            opcion.text= nombreCiudad;
          }

         
          if(selectorCiudad)
          {
            selectorCiudad.appendChild(opcion);
            
          }
          else{
            console.log("Sin Ciudades");
            
          }
        }
      )
    })
  }
  llenarUsuarios(){
    this.service.obtenerUsuarios().subscribe(paises=>{
      //console.log(paises);
    
      //console.log(this.paises[0].nombre);
      const selectorPais=document.getElementById('usuarioA');
      paises?.forEach(
        pais=>{
          const opcion= document.createElement('option');
          let nombrePais= pais.Nombre;
          let codigoPais= pais.Documento;
          opcion.value = codigoPais.toString();
          opcion.text= nombrePais;
          if(selectorPais)
          {
            selectorPais.appendChild(opcion);
          }
        }
      )
     
    })
  }
}
