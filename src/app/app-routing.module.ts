import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './publico/errores/error404/error404.component';
import { InicioComponent } from './publico/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio',
  },
  {
    path: 'parametrizacion',
    loadChildren: () =>
      import('./modulos/parametrizacion/parametrizacion.module').then(
        (m) => m.ParametrizacionModule
      ),
  },
  {
    path: 'seguridad',
    loadChildren: () =>
      import('./modulos/seguridad/seguridad.module').then(
        (m) => m.SeguridadModule
      ),
  },
  {
    path: 'error-404',
    component: Error404Component,
  },
  {
    path: '**',
    redirectTo: '/error-404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
