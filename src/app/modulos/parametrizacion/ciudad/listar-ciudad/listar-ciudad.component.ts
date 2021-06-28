import { Component, OnInit } from '@angular/core';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';
import { CiudadService } from '../../../../services/parametrizacion/ciudad.service';
@Component({
  selector: 'app-listar-ciudad',
  templateUrl: './listar-ciudad.component.html',
  styleUrls: ['./listar-ciudad.component.css'],
})
export class ListarCiudadComponent implements OnInit {
  constructor(private service: CiudadService,
    private servicioPais:PaisService) {}
  lista: CiudadModel[] = [];
  page = 5;
  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista() {
    this.service.obtenerCiudades(this.page).subscribe(
      (datos) => {
        datos.forEach(dato=>{
          this.servicioPais.obtenerPais(dato.codigoPais).subscribe((pais)=>{
            dato.pais=pais.nombre;
          },
          (error)=>{
            dato.pais='';
          })
          
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
