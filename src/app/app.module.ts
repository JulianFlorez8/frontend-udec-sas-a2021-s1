import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacionSuperiorComponent } from './publico/paginaMaestra/barra-navegacion-superior/barra-navegacion-superior.component';
import { BarraNavegacionLateralComponent } from './publico/paginaMaestra/barra-navegacion-lateral/barra-navegacion-lateral.component';
import { PiePaginaComponent } from './publico/paginaMaestra/pie-pagina/pie-pagina.component';
import { InicioComponent } from './publico/inicio/inicio.component';
import { Error404Component } from './publico/errores/error404/error404.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ModalComponent } from './publico/paginaMaestra/modal/modal.component';
@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionSuperiorComponent,
    BarraNavegacionLateralComponent,
    PiePaginaComponent,
    InicioComponent,
    Error404Component,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxCaptchaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
