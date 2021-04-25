import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { ResetearContrasenaComponent} from './resetear-contrasena/resetear-contrasena.component';
const routes: Routes = [
  {
    path: 'iniciar-sesion',
    component: IniciarSesionComponent,
  },
  {
    path: 'resetear-contrasena',
    component: ResetearContrasenaComponent,
  },
  {
    path: 'cerrar-sesion',
    component: CerrarSesionComponent,
  },
  {
    path: 'cambiar-contrasena',
    component: CambiarContrasenaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguridadRoutingModule {}
