import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ArchivosService } from '../../../../services/parametrizacion/archivos.service'
@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {
  uploadForm: FormGroup=this.fb.group({});
  fgValidator: FormGroup=this.fb.group({});
  
  constructor(
    private servicioSubida: ArchivosService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.construirFormularioCarga();
    this.FormularioValidacion();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      image: ['', [Validators.required]],
    });
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
}
