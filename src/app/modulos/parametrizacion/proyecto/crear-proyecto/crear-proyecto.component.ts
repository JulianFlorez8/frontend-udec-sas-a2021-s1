import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { ProyectoModel } from 'src/app/models/parametrizacion/proyectos.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';
import { ProyectoService } from 'src/app/services/parametrizacion/proyecto.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import {ArchivosService } from '../../../../services/parametrizacion/archivos.service'
@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {
  uploadForm: FormGroup=this.fb.group({});
  fgValidator: FormGroup=this.fb.group({});
  codigoPais?: string;
  paises?: PaisModel[];
  usuarios?: UsuarioModel[];
  ciudades?: CiudadModel[];
  constructor(
    private servicioSubida: ArchivosService,
    private fb: FormBuilder,
    private service: ProyectoService,
    private servicioCiudades: CiudadService,
    private servicioPaises: PaisService,
    private servicioUsuarios: UsuariosService
  ) { }

  ngOnInit(): void {
    this.construirFormularioCarga();
    this.FormularioValidacion();
    this.llenarPaises();
    this.llenarUsuarios();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      image: ['', [Validators.required]],
      documentoUsuario: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      pais: ['', [Validators.required]],
    });
  }
  get fgv() {
    return this.fgValidator.controls;
  }

  getProyectoData(): ProyectoModel {
    let model = new ProyectoModel();
    model.nombre = this.fgv.nombre.value;
    model.descripcion = this.fgv.descripcion.value;
    model.imagen = this.fgv.image.value;
    model.documentoUsuario = parseInt(this.fgv.documentoUsuario.value);
    model.codigoCiudad = parseInt(this.fgv.ciudad.value);

   
    return model;
  }
  RegitrarProyecto() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let proyecto = this.getProyectoData();
      this.service.creacionProyecto(proyecto).subscribe((data) => {
        console.log(data);
        if (data) {
          alert('Registro Exitoso');
        } else {
          alert('Fallo el registro');
        }
      });
    }
  }


  //CARGA DE IMAGEN
  construirFormularioCarga(){
    this.uploadForm= this.fb.group({
      file: ['', [Validators.required]]
    })
  }
  get fgUpload(){
    return this.uploadForm.controls;
  }
  cargarImagen(){
    const formData= new FormData();
    formData.append('file',this.fgUpload.file.value);
    //LLamar Servicio
    this.servicioSubida.cargarImagen('Proyecto',formData).subscribe(
      data=>{
        this.fgv.image.setValue(data.filename);
      },
      err =>{
        alert("Error al cargar la imagen");
      }
    );

  }
  onFileSelect(event: any){
    if(event.target.files.length>0){
      const f = event.target.files[0];
      this.fgUpload.file.setValue(f);
    }
  }




  llenarUsuarios(){
    this.servicioUsuarios.obtenerUsuarios().subscribe(usuarios=>{
      this.usuarios=usuarios;
      const selectorUsuarios=document.getElementById('documentoUsuario');
      this,usuarios.forEach(usuario => {
        const opcion= document.createElement('option');
        let nombreUsuario= usuario.Nombre;
        let apellidoUsuario= usuario.Apellido_1;
        let NAUsuario= nombreUsuario+' '+ apellidoUsuario;
        let codigoUsuario= usuario.Usuario;
        opcion.value = codigoUsuario.toString();
        opcion.text= NAUsuario;
        if(selectorUsuarios)
        {
          selectorUsuarios.appendChild(opcion);
        }
      }
        
      );
    });
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
}
