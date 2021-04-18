import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrizacionRoutingModule } from './parametrizacion-routing.module';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';
import { EditarPaisComponent } from './pais/editar-pais/editar-pais.component';
import { ListarPaisComponent } from './pais/listar-pais/listar-pais.component';
import { EliminarPaisComponent } from './pais/eliminar-pais/eliminar-pais.component';
import { EliminarCiudadComponent } from './ciudad/eliminar-ciudad/eliminar-ciudad.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { EditarCiudadComponent } from './ciudad/editar-ciudad/editar-ciudad.component';
import { EditarProyectoComponent } from './proyecto/editar-proyecto/editar-proyecto.component';
import { ListarProyectoComponent } from './proyecto/listar-proyecto/listar-proyecto.component';
import { EliminarProyectoComponent } from './proyecto/eliminar-proyecto/eliminar-proyecto.component';
import { CrearProyectoComponent } from './proyecto/crear-proyecto/crear-proyecto.component';
import { CrearBloqueComponent } from './bloque/crear-bloque/crear-bloque.component';
import { EditarBloqueComponent } from './bloque/editar-bloque/editar-bloque.component';
import { ListarBloqueComponent } from './bloque/listar-bloque/listar-bloque.component';
import { EliminarBloqueComponent } from './bloque/eliminar-bloque/eliminar-bloque.component';
import { EliminarInmuebleComponent } from './inmueble/eliminar-inmueble/eliminar-inmueble.component';
import { CrearInmuebleComponent } from './inmueble/crear-inmueble/crear-inmueble.component';
import { ListarInmuebleComponent } from './inmueble/listar-inmueble/listar-inmueble.component';
import { EditarInmuebleComponent } from './inmueble/editar-inmueble/editar-inmueble.component';


@NgModule({
  declarations: [
    CrearPaisComponent,
    EditarPaisComponent,
    ListarPaisComponent,
    EliminarPaisComponent,
    EliminarCiudadComponent,
    ListarCiudadComponent,
    CrearCiudadComponent,
    EditarCiudadComponent,
    EditarProyectoComponent,
    ListarProyectoComponent,
    EliminarProyectoComponent,
    CrearProyectoComponent,
    CrearBloqueComponent,
    EditarBloqueComponent,
    ListarBloqueComponent,
    EliminarBloqueComponent,
    EliminarInmuebleComponent,
    CrearInmuebleComponent,
    ListarInmuebleComponent,
    EditarInmuebleComponent
  ],
  imports: [
    CommonModule,
    ParametrizacionRoutingModule
  ]
})
export class ParametrizacionModule { }
