import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { ListarPagoComponent } from './pagos/listar-pago/listar-pago.component';
import { SubirPagoComponent } from './pagos/subir-pago/subir-pago.component';
import { AprobacionSolicitudComponent } from './solicitud-estudio/aprobacion-solicitud/aprobacion-solicitud.component';
import { CrearSolicitudComponent } from './solicitud-estudio/crear-solicitud/crear-solicitud.component';
import { ListarSolicitudComponent } from './solicitud-estudio/listar-solicitud/listar-solicitud.component';

const routes: Routes = [
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
    path: 'crear-solicitud/:codigo',//llega el codigo del inmueble
    component: CrearSolicitudComponent,
    //outlet: 'modal',
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
  exports: [RouterModule]
})
export class VentasRoutingModule { }
