import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProyectoModel } from 'src/app/models/parametrizacion/proyectos.model';
import { BloqueService } from 'src/app/services/parametrizacion/bloque.service';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { DescargaArchivosService } from 'src/app/services/parametrizacion/descarga-archivos.service';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';
import { ProyectoService } from 'src/app/services/parametrizacion/proyecto.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  logeado: Boolean = false;
  suscripcion?: Subscription;
  constructor(
    private service: ProyectoService,
    private servicioCiudad: CiudadService,
    private servicioPais: PaisService,
    private servicioBloque: BloqueService,
    private servicioDescarga: DescargaArchivosService,
    private servicioSeguridad:SeguridadService
  ) {}
  lista: ProyectoModel[] = [];
  ngOnInit(): void {
    this.suscripcion = this.servicioSeguridad.getDatosUsuario().subscribe((data) => {
      this.logeado = data.logeado;
    });
    this.obtenerLista();
  }

  obtenerLista() {
    this.service.obtenerProyectos().subscribe(
      (datos) => {
        let codigoPais = 0;

        datos.forEach((dato) => {
          let contador = 0;
          if (dato.codigoCiudad)
            this.servicioCiudad
              .obtenerCiudad(dato.codigoCiudad)
              .subscribe((ciudad) => {
                dato.ciudad = ciudad.nombre;
                codigoPais = ciudad.codigoPais;
                if (codigoPais > 0)
                  this.servicioPais
                    .obtenerPais(codigoPais)
                    .subscribe((pais) => {
                      dato.pais = pais.nombre;
                    });
              });
          if (dato.codigo)
            this.service
              .obtenerBloquesProyecto(dato.codigo)
              .subscribe((bloques) => {
                bloques.forEach((bloque) => {
                  if (bloque.codigo)
                    this.servicioBloque
                      .obtenerBloqueInmueble(bloque.codigo)
                      .subscribe((inmuebles) => {
                        contador = inmuebles.length + contador;
                        dato.inmueblesDisponibles = contador;
                      });
                });
              });
          this.servicioDescarga
            .descargarArchivo(1, dato.imagen)
            .subscribe((imagen) => {
              dato.imagen = imagen;
            });
          this.lista.push(dato);
        });
        console.log(this.lista);
      },
      (error) => {
        console.log('error');
      }
    );
  }

  btnClick(s: any): void {
    let x = document.querySelector(`#card${s}`) as HTMLElement;
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }
}
