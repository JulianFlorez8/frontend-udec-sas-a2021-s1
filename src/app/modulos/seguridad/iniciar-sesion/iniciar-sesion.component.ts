import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsConfig } from '../../../config/forms-config';
import { SecurityService } from '../../../services/security.service';
import { UsuarioModel } from 'src/app/models/seguridad/usuario.model';

declare const ShowNotificationMessage: any;

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
})
export class IniciarSesionComponent implements OnInit {
  fgValidacion: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      identificacion_usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  IniciarSesion() {
    if (this.fgValidacion.invalid) {
      ShowNotificationMessage('Invalid Form.');
    } else {
      let model = this.obtenerDatos();
      console.log(model);
      this.service.LoginUser(model).subscribe((data) => {});
    }
  }

  /**
   * Build a model instance to send it
   */
  obtenerDatos(): UsuarioModel {
    let model = new UsuarioModel();
    model.identificacion_usuario = this.obtenerFGV.identificacion_usuario.value;
    model.contrasena = this.obtenerFGV.contrasena.value;
    return model;
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }
}
