import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
import { ClienteModel } from 'src/app/models/ventas/cliente.model';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { ArchivosService } from 'src/app/services/parametrizacion/archivos.service';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { ClienteService } from 'src/app/services/ventas/cliente.service';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  uploadForm: FormGroup = this.fb.group({});
  codigoPais?: string;
  paises?: PaisModel[];
  ciudades?: CiudadModel[];
  constructor(
    private servicioSubida: ArchivosService,
    private fb: FormBuilder, 
    private service: ClienteService,
    private servicioCiudades: CiudadService,
    private servicioPaises: PaisService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.construirFormularioCarga();
    this.FormularioValidacion();
    this.llenarPaises();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      documento: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido1: ['', [Validators.required]],
      apellido2: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      image: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      total_ingresos: ['', [Validators.required]],
      datos_trabajo: ['', [Validators.required]],
      nombre_ref_familiar: ['', [Validators.required]],
      telefono_ref_familiar: ['', [Validators.required]],
      nombre_ref_personal: ['', [Validators.required]],
      telefono_ref_personal: ['', [Validators.required]],
      pais: ['',[Validators.required]],
      codigo_ciudad: ['', [Validators.required]],
      DocumentoUsuario: ['', [Validators.required]],
    });
  }

  RegitrarUsuario() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let cliente = this.getUsuarioData();
      cliente.DocumentoUsuario=10;
      console.log(cliente.DocumentoUsuario);
      console.log(cliente);
      this.service.creacionCliente(cliente).subscribe((data) => {
        console.log(data);
        if (data) {
          alert('Registro Exitoso');
          this.router.navigate(["/ventas/listar-cliente"]);
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
    model.Foto=this.fgv.image.value.toString();
    model.Celular = this.fgv.celular.value.toString();
    model.Correo = this.fgv.correo.value;
    model.Direccion= this.fgv.direccion.value;
    model.Total_Ingresos= this.fgv.total_ingresos.value;
    model.DocumentoUsuario=parseInt(this.fgv.DocumentoUsuario.value);
    model.Datos_Trabajo= this.fgv.datos_trabajo.value;
    model.Nombre_Ref_Familiar= this.fgv.nombre_ref_familiar.value;
    model.Telefono_Ref_Familiar=this.fgv.telefono_ref_familiar.value.toString();
    model.Nombre_Ref_Personal=this.fgv.nombre_ref_personal.value;
    model.Telefono_Ref_Personal=this.fgv.telefono_ref_personal.value.toString();
    model.codigoCiudad=parseInt(this.fgv.codigo_ciudad.value);
    
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  //CARGA DE IMAGEN
  construirFormularioCarga(){
    this.uploadForm = this.fb.group({
      file: ['', [Validators.required]],
    });
  }
  get fgUpload(){
    return this.uploadForm.controls;
  }
  cargarImagen() {
    const formData = new FormData();
    formData.append('file', this.fgUpload.file.value);
    //LLamar Servicio
    this.servicioSubida.cargarImagen('Cliente', formData).subscribe(
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
  llenarPaises(){
    this.fgv.DocumentoUsuario.setValue(1);
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
