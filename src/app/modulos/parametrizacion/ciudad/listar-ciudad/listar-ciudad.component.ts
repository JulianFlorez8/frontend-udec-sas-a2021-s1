import { Component, OnInit } from '@angular/core';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
import { CiudadService } from '../../../../services/parametrizacion/ciudad.service';
@Component({
  selector: 'app-listar-ciudad',
  templateUrl: './listar-ciudad.component.html',
  styleUrls: ['./listar-ciudad.component.css'],
})
export class ListarCiudadComponent implements OnInit {
  constructor(private service: CiudadService) {}
  lista: CiudadModel[] = [];
  page = 5;
  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista() {
    this.service.obtenerCiudades(this.page).subscribe(
      (datos) => {
        datos.forEach(dato=>{
//          dato.codigoPais=;
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
