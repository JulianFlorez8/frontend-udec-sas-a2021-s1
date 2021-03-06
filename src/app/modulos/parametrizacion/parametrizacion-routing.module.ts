import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearBloqueComponent } from './bloque/crear-bloque/crear-bloque.component';
import { EditarBloqueComponent } from './bloque/editar-bloque/editar-bloque.component';
import { EliminarBloqueComponent } from './bloque/eliminar-bloque/eliminar-bloque.component';
import { ListarBloqueComponent } from './bloque/listar-bloque/listar-bloque.component';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { EditarCiudadComponent } from './ciudad/editar-ciudad/editar-ciudad.component';
import { EliminarCiudadComponent } from './ciudad/eliminar-ciudad/eliminar-ciudad.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { CrearInmuebleComponent } from './inmueble/crear-inmueble/crear-inmueble.component';
import { EditarInmuebleComponent } from './inmueble/editar-inmueble/editar-inmueble.component';
import { EliminarInmuebleComponent } from './inmueble/eliminar-inmueble/eliminar-inmueble.component';
import { ListarInmuebleComponent } from './inmueble/listar-inmueble/listar-inmueble.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';
import { EditarPaisComponent } from './pais/editar-pais/editar-pais.component';
import { EliminarPaisComponent } from './pais/eliminar-pais/eliminar-pais.component';
import { ListarPaisComponent } from './pais/listar-pais/listar-pais.component';
import { CrearProyectoComponent } from './proyecto/crear-proyecto/crear-proyecto.component';
import { EditarProyectoComponent } from './proyecto/editar-proyecto/editar-proyecto.component';
import { EliminarProyectoComponent } from './proyecto/eliminar-proyecto/eliminar-proyecto.component';
import { ListarProyectoComponent } from './proyecto/listar-proyecto/listar-proyecto.component';


const routes: Routes = [
  {
    path: 'crear-proyecto',
    component: CrearProyectoComponent,
    outlet: 'modal',
  },
  {
    path: 'editar-proyecto/:codigo',
    component: EditarProyectoComponent,

  },
  {
    path: 'eliminar-proyecto',
    component: EliminarProyectoComponent,
    outlet: 'modal',
  },
  {
    path: 'listar-proyecto',
    component: ListarProyectoComponent,
  },
  
  {
    path: 'crear-bloque',
    component: CrearBloqueComponent,
    outlet: 'modal',
  },
  {
    path: 'editar-bloque/:codigo',
    component: EditarBloqueComponent,

  },
  {
    path: 'eliminar-bloque',
    component: EliminarBloqueComponent,
    outlet: 'modal',
  },
  {
    path: 'listar-bloque',

    component: ListarBloqueComponent,
  },
  {
    path: 'crear-ciudad',
    component: CrearCiudadComponent,
    outlet: 'modal',
  },
  {
    path: 'editar-ciudad/:codigo',
    component: EditarCiudadComponent,
  
  },
  {
    path: 'eliminar-ciudad',
    component: EliminarCiudadComponent,
    outlet: 'modal',
  },
  {
    path: 'listar-ciudad',
    component: ListarCiudadComponent,
  },
  {
    path: 'crear-inmueble',
    component: CrearInmuebleComponent,
    outlet: 'modal',
  },
  {
    path: 'editar-inmueble/:codigo',
    component: EditarInmuebleComponent,

  },
  {
    path: 'eliminar-inmueble',
    component: EliminarInmuebleComponent,
    outlet: 'modal',
  },
  {
    path: 'listar-inmueble',
    component: ListarInmuebleComponent,
  },
  {
    path: 'crear-pais',
    component: CrearPaisComponent,
    outlet: 'modal',
  },
  {
    path: 'editar-pais/:codigo',
    component: EditarPaisComponent,
 
  },
  {
    path: 'eliminar-pais',
    component: EliminarPaisComponent,
    outlet: 'modal',
  },
  {
    path: 'listar-pais',
    component: ListarPaisComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametrizacionRoutingModule {}
