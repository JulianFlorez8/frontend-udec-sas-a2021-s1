import { Component, OnInit } from '@angular/core';
import { InmuebleModel } from 'src/app/models/parametrizacion/inmueble.model';
import { InmuebleService } from '../../../../services/parametrizacion/inmueble.service';

@Component({
  selector: 'app-listar-inmueble',
  templateUrl: './listar-inmueble.component.html',
  styleUrls: ['./listar-inmueble.component.css'],
})
export class ListarInmuebleComponent implements OnInit {
  constructor(private service: InmuebleService) {}
  lista: InmuebleModel[] = [];
  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista() {
    this.service.obtenerInmuebles().subscribe(
      (datos) => {
        this.lista = datos;
        console.log(this.lista);
      },
      (error) => {
        console.log('error');
      }
    );
  }
}
