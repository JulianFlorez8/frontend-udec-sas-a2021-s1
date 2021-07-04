import { Component, OnInit } from '@angular/core';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';
import { PaisService } from '../../../../services/parametrizacion/pais.service';
import { EliminarPaisComponent} from '../eliminar-pais/eliminar-pais.component'
@Component({
  selector: 'app-listar-pais',
  templateUrl: './listar-pais.component.html',
  styleUrls: ['./listar-pais.component.css'],
})
export class ListarPaisComponent implements OnInit {
  constructor(private service: PaisService,
    private servicioSeguridad: SeguridadService) {}
  lista: PaisModel[] = [];
  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista() {
    this.service.obtenerPaises().subscribe(
      (datos) => {
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
