import { Component, OnInit } from '@angular/core';
import { PagosModel } from 'src/app/models/parametrizacion/pagos.model';
import { PagoService } from 'src/app/services/parametrizacion/pago.service';

@Component({
  selector: 'app-listar-pago',
  templateUrl: './listar-pago.component.html',
  styleUrls: ['./listar-pago.component.css']
})
export class ListarPagoComponent implements OnInit {
  constructor(private service: PagoService) {}
  lista: PagosModel[] = [];
  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista() {
    this.service.obtenerPagos().subscribe(
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