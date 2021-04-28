import { Component, OnInit } from '@angular/core';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';

@Component({
  selector: 'app-eliminar-ciudad',
  templateUrl: './eliminar-ciudad.component.html',
  styleUrls: ['./eliminar-ciudad.component.css']
})
export class EliminarCiudadComponent implements OnInit {

  constructor(
    private service: CiudadService,
  ) { }

  ngOnInit(): void {
  }


  eliminarCiudad(idCiudad: number){
    this.service.eliminarCiudad(idCiudad);
    
  }
}
