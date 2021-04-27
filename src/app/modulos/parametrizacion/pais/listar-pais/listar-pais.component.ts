import { Component, OnInit } from '@angular/core';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { PaisService } from '../../../../services/parametrizacion/pais.service';
@Component({
  selector: 'app-listar-pais',
  templateUrl: './listar-pais.component.html',
  styleUrls: ['./listar-pais.component.css'],
})
export class ListarPaisComponent implements OnInit {
  constructor(private service: PaisService) {}
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
}
