import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { ProyectoModel } from 'src/app/models/parametrizacion/proyectos.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ArchivosService } from 'src/app/services/parametrizacion/archivos.service';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';
import { ProyectoService } from 'src/app/services/parametrizacion/proyecto.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {
  uploadForm: FormGroup=this.fb.group({});
  fgValidator: FormGroup=this.fb.group({});
  codigoPais?: string;
  paises?: PaisModel[];
  usuarios?: UsuarioModel[];
  proyectos?: ProyectoModel[];
  ciudades?: CiudadModel[];
  elementoID: number=0;
  constructor(
    private servicioSubida: ArchivosService,
    private fb: FormBuilder,
    private service: ProyectoService,
    private servicioCiudades: CiudadService,
    private servicioPaises: PaisService,
    private servicioUsuarios: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.elementoID= this.route.snapshot.params["codigo"];
    }

  ngOnInit(): void {
    this.construirFormularioCarga();
    this.FormularioValidacion();
    this.getProyectoActual();
    
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      image: ['', [Validators.required]],
      documentoUsuario: ['', [Validators.required]],
      codigoCiudad: ['', [Validators.required]],
    });
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  getProyectoActual(){
    this.service.obtenerProyecto(this.elementoID).subscribe(
      data =>{
        this.fgv.codigo.setValue(data.codigo);
        this.fgv.nombre.setValue(data.nombre);
        this.fgv.descripcion.setValue(data.descripcion);
        this.fgv.image.setValue(data.imagen);
        this.fgv.documentoUsuario.setValue(data.documentoUsuario);
        this.fgv.codigoCiudad.setValue(data.codigoCiudad);
      },
      error =>{
        alert('No se encontro el elemento');
       this.router.navigate(["/parametrizacion/listar-proyecto"]);
      }
    )
  }
  getProyectoData(): ProyectoModel {
    let model = new ProyectoModel();
    model.codigo= parseInt(this.fgv.codigo.value);
    model.nombre = this.fgv.nombre.value;
    model.descripcion = this.fgv.descripcion.value;
    model.imagen = this.fgv.image.value;
    model.documentoUsuario = parseInt(this.fgv.documentoUsuario.value);
    model.codigoCiudad =parseInt(this.fgv.codigoCiudad.value);

   
    return model;
  }
  ActualizarProyecto() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let proyecto = this.getProyectoData();
     
        this.service.actualizarProyecto(this.elementoID,proyecto).subscribe((data) => {
          console.log(data);
          if (data) {
            alert('Actualizacion Exitosa');
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
  llenarProyectos(){
    this.service.obtenerProyectos().subscribe(proyectos=>{
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
