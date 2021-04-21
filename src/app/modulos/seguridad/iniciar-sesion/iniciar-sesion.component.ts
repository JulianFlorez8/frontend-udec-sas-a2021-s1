import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CredencialesModel } from 'src/app/models/seguridad/credenciales.model';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';
import { FormsConfig } from '../../../config/forms-config';



@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
})
export class IniciarSesionComponent implements OnInit {
  fgValidacion: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private service: SeguridadService
  ) {}
  ngOnInit(): void {
    this.ConstruirFormulario();
  }
  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      Usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
    });
  }

 

  IniciarSesion() {
    if (this.fgValidacion.invalid) {
      alert('Formulario invalido.');
    } else {
      let credenciales = this.obtenerDatos();
      this.service.ingresoUsuarios(credenciales).subscribe((data) => {
        console.log(data);
        if (data) {
          alert('Bienvenido');
        } else {
          alert('Fallo el registro');
        }
      });
      /*this.service.LoginUser(model).subscribe((data) => {
      console.log('datos');
      alert(data);
      if (data){
          alert('Bienvenido Usuario');
          console.log(data);
          alert(data.token);
          alert(data.usuario);
      }
      else{
          alert("Error");
        }
      });*/
    }
  }

  /**
   * Build a model instance to send it
   */
  obtenerDatos(): CredencialesModel {
    let model = new CredencialesModel();
    model.Usuario = this.fgv.Usuario.value;
    model.contrasena = this.fgv.contrasena.value;
    return model;
  }

  get fgv() {
    return this.fgValidacion.controls;
  }
  
}
