import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetearContrasenaModel } from 'src/app/models/seguridad/resetear-contrasena';
import {UsuariosService} from 'src/app/services/usuarios.service'
@Component({
  selector: 'app-resetear-contrasena',
  templateUrl: './resetear-contrasena.component.html',
  styleUrls: ['./resetear-contrasena.component.css']
})
export class ResetearContrasenaComponent implements OnInit {

  fgValidator: FormGroup = this.fb.group({});
  constructor(
    private fb: FormBuilder, 
    private service: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}
    

  ngOnInit(): void {
    this.FormularioValidacion();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      Usuario: ['', [Validators.required]]
    });
  }

  RegitrarCiudad() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let recuperar = this.getRecuperarData();
      this.service.resetearContrasena(recuperar).subscribe((data) => {
        console.log(data);
        if (data) {
          alert('Se envio su nueva contraseña a su correo Electronico y al numero de celular.');
          this.router.navigate(["/seguridad/iniciar-sesion"]);
        } else {
          alert('Usuario no encontrado');
        }
      });
    }
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getRecuperarData(): ResetearContrasenaModel {
    let model = new ResetearContrasenaModel();
    model.Usuario = this.fgv.Usuario.value;
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
}