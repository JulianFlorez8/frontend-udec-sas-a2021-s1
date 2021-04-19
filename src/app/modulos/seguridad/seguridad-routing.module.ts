import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';

const routes: Routes = [
  {
    path: 'iniciar-sesion',
    component: IniciarSesionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguridadRoutingModule {}
