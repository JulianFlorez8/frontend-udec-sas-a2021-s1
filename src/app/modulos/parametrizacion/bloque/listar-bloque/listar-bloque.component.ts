import { Component, OnInit } from '@angular/core';
import { BloqueModel } from 'src/app/models/parametrizacion/bloque.model';
import { BloqueService } from '../../../../services/parametrizacion/bloque.service';

@Component({
  selector: 'app-listar-bloque',
  templateUrl: './listar-bloque.component.html',
  styleUrls: ['./listar-bloque.component.css'],
})
export class ListarBloqueComponent implements OnInit {
  constructor(private service: BloqueService) {}
  lista: BloqueModel[] = [];
  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista() {
    this.service.obtenerBloques().subscribe(
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
