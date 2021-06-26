import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { CrearSolicitudComponent } from './solicitud-estudio/crear-solicitud/crear-solicitud.component';
import { ListarSolicitudComponent } from './solicitud-estudio/listar-solicitud/listar-solicitud.component';
import { AprobacionSolicitudComponent } from './solicitud-estudio/aprobacion-solicitud/aprobacion-solicitud.component';
import { SubirPagoComponent } from './pagos/subir-pago/subir-pago.component';
import { ListarPagoComponent } from './pagos/listar-pago/listar-pago.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    EditarClienteComponent,
    EliminarClienteComponent,
    ListarClienteComponent,
    CrearClienteComponent,
    CrearSolicitudComponent,
    ListarSolicitudComponent,
    AprobacionSolicitudComponent,
    SubirPagoComponent,
    ListarPagoComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class VentasModule { }
