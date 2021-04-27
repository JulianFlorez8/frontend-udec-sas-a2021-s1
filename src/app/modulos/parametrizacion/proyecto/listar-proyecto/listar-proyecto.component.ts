import { Component, OnInit } from '@angular/core';
import { ProyectoModel } from 'src/app/models/parametrizacion/proyectos.model';
import { ProyectoService } from '../../../../services/parametrizacion/proyecto.service';

@Component({
  selector: 'app-listar-proyecto',
  templateUrl: './listar-proyecto.component.html',
  styleUrls: ['./listar-proyecto.component.css'],
})
export class ListarProyectoComponent implements OnInit {
  constructor(private service: ProyectoService) {}
  lista: ProyectoModel[] = [];
  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista() {
    this.service.obtenerProyectos().subscribe(
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
