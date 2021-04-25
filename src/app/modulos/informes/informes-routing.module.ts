import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformePagosComponent } from './informe-pagos/informe-pagos.component';
import { InformeProyectosComponent } from './informe-proyectos/informe-proyectos.component';
import { InformeVentasComponent } from './informe-ventas/informe-ventas.component';

const routes: Routes = [
  {
    path: 'informe-pagos',
    component: InformePagosComponent,
  },
  {
    path: 'informe-proyectos',
    component: InformeProyectosComponent,
  },
  {
    path: 'informe-ventas',
    component: InformeVentasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformesRoutingModule { }
