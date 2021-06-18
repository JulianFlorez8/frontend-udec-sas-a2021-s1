import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModel } from 'src/app/models/parametrizacion/cliente.model';
import { ArchivosService } from 'src/app/services/parametrizacion/archivos.service';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { ClienteService } from 'src/app/services/parametrizacion/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  uploadForm: FormGroup = this.fb.group({});
  codigoPais?: string;
  elementoID: string='';
  constructor(
    private servicioSubida: ArchivosService,
    private fb: FormBuilder, 
    private service: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.elementoID= this.route.snapshot.params["codigo"];
    }

  ngOnInit(): void {
    this.FormularioValidacion();
    this.getClienteActual();
    
  }
  getClienteActual(){
    this.service.obtenerrCliente(parseInt(this.elementoID)).subscribe(
      data =>{
        this.fgv.documento.setValue(data.Documento);
        this.fgv.nombre.setValue(data.Nombre);
        this.fgv.apellido1.setValue(data.Apellido_1);
        this.fgv.apellido2.setValue(data.Apellido_2);
        this.fgv.fecha_nacimiento.setValue(data.Fecha_Nacimiento);
        this.fgv.image.setValue(data.Foto);
        this.fgv.celular.setValue(data.Celular);
        this.fgv.correo.setValue(data.Correo);
        this.fgv.direccion.setValue(data.Direccion);
        this.fgv.total_ingresos.setValue(data.Total_Ingresos);
        if(data.Datos_Trabajo)
        this.fgv.datos_trabajo.setValue(data.Datos_Trabajo[0]);
        this.fgv.nombre_ref_familiar.setValue(data.Nombre_Ref_Familiar);
        this.fgv.telefono_ref_familiar.setValue(data.Telefono_Ref_Familiar);
        this.fgv.nombre_ref_personal.setValue(data.Nombre_Ref_Personal);
        this.fgv.telefono_ref_personal.setValue(data.Telefono_Ref_Personal);
        this.fgv.documento_usuario.setValue(data.documentoUsuario);
        this.fgv.codigo_ciudad.setValue(data.codigoCiudad);
      },
      error =>{
        alert('No se encontro el elemento');
       this.router.navigate(["/parametrizacion/listar-cliente"]);
      }
    )
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
      documento_usuario: ['', [Validators.required]],
      pais: ['',[Validators.required]],
      codigo_ciudad: ['', [Validators.required]],
      
    });
  }

  EditarUsuario() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let cliente = this.getUsuarioData();
      this.service.actualizarCliente(parseInt(this.elementoID),cliente).subscribe((data) => {
        console.log(data);
        if (data) {
          alert('Edición Exitosa');
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
    model.Datos_Trabajo= [this.fgv.datos_trabajo.value,"",""];
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


}
