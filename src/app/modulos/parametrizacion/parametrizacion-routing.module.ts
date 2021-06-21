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
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { CrearInmuebleComponent } from './inmueble/crear-inmueble/crear-inmueble.component';
import { EditarInmuebleComponent } from './inmueble/editar-inmueble/editar-inmueble.component';
import { EliminarInmuebleComponent } from './inmueble/eliminar-inmueble/eliminar-inmueble.component';
import { ListarInmuebleComponent } from './inmueble/listar-inmueble/listar-inmueble.component';
import { ListarPagoComponent } from './pagos/listar-pago/listar-pago.component';
import { SubirPagoComponent } from './pagos/subir-pago/subir-pago.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';
import { EditarPaisComponent } from './pais/editar-pais/editar-pais.component';
import { EliminarPaisComponent } from './pais/eliminar-pais/eliminar-pais.component';
import { ListarPaisComponent } from './pais/listar-pais/listar-pais.component';
import { CrearProyectoComponent } from './proyecto/crear-proyecto/crear-proyecto.component';
import { EditarProyectoComponent } from './proyecto/editar-proyecto/editar-proyecto.component';
import { EliminarProyectoComponent } from './proyecto/eliminar-proyecto/eliminar-proyecto.component';
import { ListarProyectoComponent } from './proyecto/listar-proyecto/listar-proyecto.component';
import { AprobacionSolicitudComponent } from './solicitud-estudio/aprobacion-solicitud/aprobacion-solicitud.component';
import { CrearSolicitudComponent } from './solicitud-estudio/crear-solicitud/crear-solicitud.component';
import { ListarSolicitudComponent } from './solicitud-estudio/listar-solicitud/listar-solicitud.component';

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
    path: 'eliminar-proyecto/:codigo',
    component: EliminarProyectoComponent,
    outlet: 'modal',
  },
  {
    path: 'listar-proyecto',
    component: ListarProyectoComponent,
  },
  {
    path: 'crear-cliente',
    component: CrearClienteComponent,
    outlet: 'modal',
  },
  {
    path: 'editar-cliente/:codigo',
    component: EditarClienteComponent,
  },
  {
    path: 'eliminar-cliente/:codigo',
    component: EliminarClienteComponent,
  },
  {
    path: 'listar-cliente',
    component: ListarClienteComponent,
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
    path: 'eliminar-bloque/:codigo',
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
    path: 'eliminar-ciudad/:codigo',
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
    path: 'eliminar-inmueble/:codigo',
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
    path: 'eliminar-pais/:codigo',
    component: EliminarPaisComponent,
    outlet: 'modal',
  },
  {
    path: 'listar-pais',
    component: ListarPaisComponent,
  },
  {
    path: 'crear-solicitud',
    component: CrearSolicitudComponent,
    outlet: 'modal',
  },
  {
    path: 'aprobacion-solicitud/:codigo',
    component: AprobacionSolicitudComponent,
  },
  {
    path: 'listar-solicitud',
    component: ListarSolicitudComponent,
  },
  {
    path: 'listar-pago',
    component: ListarPagoComponent,
  },
  {
    path: 'subir-pago/:codigo',
    component: SubirPagoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametrizacionRoutingModule {}
