import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CambioContrasenaModel} from 'src/app/models/seguridad/cambio-contrasena'
import { ServiceConfig } from 'src/app/config/service.config';
import {AES} from 'crypto-js/';
@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder, 
    private service: UsuariosService,
    private route: ActivatedRoute,
    private router:Router) {
      
    }

  ngOnInit(): void {
    this.FormularioValidacion();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      Usuario: ['', [Validators.required]],
      contrasenaActual: ['', [Validators.required]],
      contrasenaNueva: ['', Validators.required],
      confirmeContrasena:['', Validators.required]

    });
  }

  RecuperarContrasena() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let usuario = this.getCredencialesData();
      if(usuario.confirmarContrasena="")
      {
        alert("No coinciden las contraseñas")
      }
      else{
        this.service.cambiarContrasena(usuario).subscribe((data) => {
          alert('Contraseña efectivamente Cambiada');
          this.router.navigate(["/inicio"]);
        },err=>{
          alert('Usuario o contraseña NO validos');
        }
);
      }
      
    
    
      
    }
}
  //Obtenego datos del formulario y los paso al modelo de credenciales
  getCredencialesData(): CambioContrasenaModel {
    let credenciales = new CambioContrasenaModel();
    credenciales.usuario = this.fgv.Usuario.value;
    credenciales.antiguaContrasena=AES.encrypt(this.fgv.contrasenaActual.value, ServiceConfig.AESKey).toString();
    if(this.fgv.contrasenaNueva==this.fgv.confirmeContrasena)
    {
      credenciales.nuevaContrasena = AES.encrypt(this.fgv.contrasenaNueva.value, ServiceConfig.AESKey).toString();
      credenciales.confirmarContrasena=AES.encrypt(this.fgv.confirmeContrasena.value, ServiceConfig.AESKey).toString();
    }
    else{
      credenciales.nuevaContrasena ="";
      credenciales.confirmarContrasena="";
      
    }
    return credenciales;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
}
