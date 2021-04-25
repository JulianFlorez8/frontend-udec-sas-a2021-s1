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
  },
  {
    path: 'editar-proyecto',
    component: EditarProyectoComponent,
  }
  ,
  {
    path: 'eliminar-proyecto',
    component: EliminarProyectoComponent,
  }
  ,
  {
    path: 'listar-proyecto',
    component: ListarProyectoComponent,
  },
  {
    path: 'crear-cliente',
    component: CrearClienteComponent,
  },
  {
    path: 'editar-cliente',
    component: EditarClienteComponent,
  }
  ,
  {
    path: 'eliminar-cliente',
    component: EliminarClienteComponent,
  }
  ,
  {
    path: 'listar-cliente',
    component: ListarClienteComponent,
  },
  {
    path: 'crear-bloque',
    component: CrearBloqueComponent,
  },
  {
    path: 'editar-bloque',
    component: EditarBloqueComponent,
  }
  ,
  {
    path: 'eliminar-bloque',
    component: EliminarBloqueComponent,
  }
  ,
  {
    path: 'listar-bloque',
    component: ListarBloqueComponent,
  },
  {
    path: 'crear-ciudad',
    component: CrearCiudadComponent,
  },
  {
    path: 'editar-ciudad',
    component: EditarCiudadComponent,
  }
  ,
  {
    path: 'eliminar-ciudad',
    component: EliminarCiudadComponent,
  }
  ,
  {
    path: 'listar-ciudad',
    component: ListarCiudadComponent,
  },
  {
    path: 'crear-inmueble',
    component: CrearInmuebleComponent,
  },
  {
    path: 'editar-inmueble',
    component: EditarInmuebleComponent,
  }
  ,
  {
    path: 'eliminar-inmueble',
    component: EliminarInmuebleComponent,
  }
  ,
  {
    path: 'listar-inmueble',
    component: ListarInmuebleComponent,
  },
  {
    path: 'crear-pais',
    component: CrearPaisComponent,
  },
  {
    path: 'editar-pais',
    component: EditarPaisComponent,
  }
  ,
  {
    path: 'eliminar-pais',
    component: EliminarPaisComponent,
  }
  ,
  {
    path: 'listar-pais',
    component: ListarPaisComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
