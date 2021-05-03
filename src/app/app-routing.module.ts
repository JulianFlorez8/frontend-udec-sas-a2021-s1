import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './publico/errores/error404/error404.component';
import { InicioComponent } from './publico/inicio/inicio.component';
import { ModalComponent } from './publico/paginaMaestra/modal/modal.component';
import { CrearUsuarioComponent } from './modulos/usuario/crear-usuario/crear-usuario.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio',
  },
  {
    path: 'inicio',
    component: InicioComponent,
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
    path: 'usuario',
    loadChildren: () =>
      import('./modulos/usuario/usuario.module').then((m) => m.UsuarioModule),
  },
  {
    path: 'informes',
    loadChildren: () =>
      import('./modulos/informes/informes.module').then((m) => m.InformesModule),
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
