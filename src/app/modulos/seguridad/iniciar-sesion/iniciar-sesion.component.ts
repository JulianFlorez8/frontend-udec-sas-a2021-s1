import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
})
export class IniciarSesionComponent implements OnInit {
  fgValidacion: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }
}
