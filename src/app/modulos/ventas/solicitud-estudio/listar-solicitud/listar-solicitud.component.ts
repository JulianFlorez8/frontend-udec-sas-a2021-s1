import { Component, OnInit } from '@angular/core';
import { SolicitudEstudioModel } from 'src/app/models/ventas/solicitudEstudio.model';
import { InmuebleService } from 'src/app/services/parametrizacion/inmueble.service';
import { SolicitudService } from 'src/app/services/ventas/solicitud.service';

@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.css']
})
export class ListarSolicitudComponent implements OnInit {

  constructor(private service: SolicitudService,
    private servicioImueble: InmuebleService) {}
  lista: SolicitudEstudioModel[] = [];
  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista() {
    this.service.obtenerSolicitudesEnEstudio().subscribe(//SOLO SE ENLISTAN AQUELLOS QUE ESTEN EN ESTUDIO
      (datos) => {
        datos.forEach(dato=>{
          if(dato.codigoInmueble)
          this.servicioImueble.obtenerInmueble(dato.codigoInmueble).subscribe((inm)=>{dato.inmueble=inm.identificador})
        })
        this.lista = datos;
        console.log(this.lista);
      },
      (error) => {
        console.log('error');
      }
    );
  }
}
