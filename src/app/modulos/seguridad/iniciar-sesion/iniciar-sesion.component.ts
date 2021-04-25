import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceConfig } from 'src/app/config/service.config';
import { CredencialesModel } from 'src/app/models/seguridad/credenciales.model';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';
import { FormsConfig } from '../../../config/forms-config';
import{ InicioModel } from'../../../models/seguridad/Inicio.model';



@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
})
export class IniciarSesionComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  siteKey: string=ServiceConfig.keyCaptchap;
  constructor(
    private fb: FormBuilder, 
    private service: SeguridadService,
    private route: ActivatedRoute,
    private router:Router) {
      
    }

  ngOnInit(): void {
    this.FormularioValidacion();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      Usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
      recaptcha: ['', Validators.required]

    });
  }

  IniciarSesion() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let usuario = this.getCredencialesData();
      this.service.ingresoUsuarios(usuario).subscribe((data) => {
        alert('Bienvenido');
        let res= this.service.guardarSesion(data);
        this.router.navigate(["/inicio"]);
      },err=>{
        alert('Usuario o contraseña NO validos');
      }
    
    
      );
    }
}
  //Obtenego datos del formulario y los paso al modelo de credenciales
  getCredencialesData(): CredencialesModel {
    let credenciales = new CredencialesModel();
    credenciales.Usuario = this.fgv.Usuario.value;
    credenciales.contrasena = this.fgv.contrasena.value;
    return credenciales;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
}
