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
import { ArchivosService } from '../../../../services/parametrizacion/archivos.service';
@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css'],
})
export class CrearProyectoComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  uploadForm: FormGroup = this.fb.group({});
  codigoPais?: string;
  paises?: PaisModel[];
  usuarios?: UsuarioModel[];
  ciudades?: CiudadModel[];
  imagen?: String;
  constructor(
    private servicioSubida: ArchivosService,
    private fb: FormBuilder,
    private service: ProyectoService,
    private servicioCiudades: CiudadService,
    private servicioPaises: PaisService,
    private servicioUsuarios: UsuariosService
  ) {}

  ngOnInit(): void {
    this.construirFormularioCarga();
    this.FormularioValidacion();
    this.llenarPaises();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      image: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      pais: ['', [Validators.required]],
    });
  }
  get fgv() {
    return this.fgValidator.controls;
  }

  getProyectoData(): ProyectoModel {
    let model = new ProyectoModel();
    model.nombre = this.fgv.nombre.value.toString();
    model.descripcion = this.fgv.descripcion.value.toString();
    model.imagen = this.fgv.image.value.toString();
    model.DocumentoUsuario = 0;
    model.codigoCiudad = parseInt(this.fgv.ciudad.value);
    return model;
  }
  RegitrarProyecto() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let proyecto = this.getProyectoData();
      console.log(proyecto);
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
  construirFormularioCarga() {
    this.uploadForm = this.fb.group({
      file: ['', [Validators.required]],
    });
  }
  get fgUpload() {
    return this.uploadForm.controls;
  }
  cargarImagen() {
    const formData = new FormData();
    formData.append('file', this.fgUpload.file.value);
    //LLamar Servicio
    this.servicioSubida.cargarImagen('Proyecto', formData).subscribe(
      (data) => {
        this.fgv.image.setValue(data.filename);
      },
      (err) => {
        alert('Error al cargar la imagen');
      }
    );
  }
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const f = event.target.files[0];
      this.fgUpload.file.setValue(f);
    }
  }

  llenarPaises() {
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
