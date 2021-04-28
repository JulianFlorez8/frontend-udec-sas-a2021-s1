import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/parametrizacion/proyecto.service';

@Component({
  selector: 'app-eliminar-proyecto',
  templateUrl: './eliminar-proyecto.component.html',
  styleUrls: ['./eliminar-proyecto.component.css']
})
export class EliminarProyectoComponent implements OnInit {

  constructor(
    private service: ProyectoService,
  ) { }

  ngOnInit(): void {
  }


  eliminarPais(idProyecto: number){
    this.service.eliminarProyecto(idProyecto);
    
  }

}
