import { Component, OnInit } from '@angular/core';
import { InmuebleService } from 'src/app/services/parametrizacion/inmueble.service';

@Component({
  selector: 'app-eliminar-inmueble',
  templateUrl: './eliminar-inmueble.component.html',
  styleUrls: ['./eliminar-inmueble.component.css']
})
export class EliminarInmuebleComponent implements OnInit {

  constructor(
    private service: InmuebleService,
  ) { }

  ngOnInit(): void {
  }


  eliminarInmueble(idInmueble: number){
    this.service.eliminarInmueble(idInmueble);
    
  }
}
