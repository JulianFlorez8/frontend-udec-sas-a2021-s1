import { Component, OnInit } from '@angular/core';
import { InmuebleModel } from 'src/app/models/parametrizacion/inmueble.model';
import { BloqueService } from 'src/app/services/parametrizacion/bloque.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';
import { InmuebleService } from '../../../../services/parametrizacion/inmueble.service';

@Component({
  selector: 'app-listar-inmueble',
  templateUrl: './listar-inmueble.component.html',
  styleUrls: ['./listar-inmueble.component.css'],
})
export class ListarInmuebleComponent implements OnInit {
  constructor(private service: InmuebleService,
    private servicioBloque: BloqueService,
    private servicioSeguridad:SeguridadService) {}
  lista: InmuebleModel[] = [];
  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista() {
    this.service.obtenerInmuebles().subscribe(
      (datos) => {
        datos.forEach(dato=>{
          if(dato.codigoBloque)
          this.servicioBloque.obtenerBloque(dato.codigoBloque).subscribe((bloq=>{dato.bloque=bloq.nombre}))
        })
        this.lista = datos;
        console.log(this.lista);
      },
      (error) => {
        console.log('error');
      }
    );
  }
  ponerid(id:any, elemento: any){
    console.log("id:"+id);
    this.servicioSeguridad.setIdUnivesal(id,elemento);
    //EliminarPaisComponent.elemento="";
  }
}
