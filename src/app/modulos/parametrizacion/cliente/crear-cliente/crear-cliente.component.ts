import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteModel } from 'src/app/models/parametrizacion/cliente.model';
import { ArchivosService } from 'src/app/services/parametrizacion/archivos.service';
import { ClienteService } from 'src/app/services/parametrizacion/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  uploadForm: FormGroup = this.fb.group({});
  constructor(
    private servicioSubida: ArchivosService,
    private fb: FormBuilder, 
    private service: ClienteService) {}

  ngOnInit(): void {
    this.FormularioValidacion();
    this.construirFormularioCarga();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      documento: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido1: ['', [Validators.required]],
      apellido2: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      total_ingresos: ['', [Validators.required]],
      datos_trabajo: ['', [Validators.required]],
      nombre_ref_familiar: ['', [Validators.required]],
      telefono_ref_familiar: ['', [Validators.required]],
      nombre_ref_personal: ['', [Validators.required]],
      telefono_ref_personal: ['', [Validators.required]],
      documento_usuario: ['', [Validators.required]],
      codigo_ciudad: ['', [Validators.required]],
      
    });
  }

  RegitrarUsuario() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let cliente = this.getUsuarioData();
      this.service.creacionCliente(cliente).subscribe((data) => {
        console.log(data);
        if (data) {
          alert('Registro Exitoso');
        } else {
          alert('Fallo el registro');
        }
      });
    }
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getUsuarioData(): ClienteModel {
    let model = new ClienteModel();
    model.Documento= this.fgv.documento.value;
    model.Nombre = this.fgv.nombre.value;
    model.Apellido_1 = this.fgv.apellido1.value;
    model.Apellido_2 = this.fgv.apellido2.value;
    model.Fecha_Nacimiento= this.fgv.fecha_nacimiento.value;
    model.Foto=this.fgv.foto.value;
    model.Celular = this.fgv.celular.value.toString();
    model.Correo = this.fgv.correo.value;
    model.Direccion= this.fgv.direccion.value;
    model.Total_Ingresos= this.fgv.total_ingresos.value;
    model.Datos_Trabajo= this.fgv.datos_trabajo.value;
    model.Nombre_Ref_Familiar= this.fgv.nombre_ref_familiar.value;
    model.Telefono_Ref_Familiar=this.fgv.telefono_ref_familiar.value;
    model.Nombre_Ref_Personal=this.fgv.nombre_ref_personal.value;
    model.Telefono_Ref_Personal=this.fgv.telefono_ref_personal.value;
    model.documentoUsuario=this.fgv.documento_usuario.value;
    model.codigoCiudad=this.fgv.codigo_ciudad.value;
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
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
    this.servicioSubida.cargarImagen('Cliente',formData).subscribe(
      data=>{
        this.fgv.foto.setValue(data.filename);
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
}