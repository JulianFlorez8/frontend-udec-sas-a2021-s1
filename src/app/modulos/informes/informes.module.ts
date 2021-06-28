import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformesRoutingModule } from './informes-routing.module';
import { InformeVentasComponent } from './informe-ventas/informe-ventas.component';
import { InformeProyectosComponent } from './informe-proyectos/informe-proyectos.component';
import { InformePagosComponent } from './informe-pagos/informe-pagos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    InformeVentasComponent,
    InformeProyectosComponent,
    InformePagosComponent
  ],
  imports: [
    CommonModule,
    InformesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ]
})
export class InformesModule { }
