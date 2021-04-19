import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { ResetearContrasenaComponent } from './resetear-contrasena/resetear-contrasena.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IniciarSesionComponent,
    CerrarSesionComponent,
    ResetearContrasenaComponent,
    CambiarContrasenaComponent,
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SeguridadModule {}
