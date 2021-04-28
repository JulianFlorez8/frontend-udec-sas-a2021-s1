import { Component, OnInit } from '@angular/core';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';

@Component({
  selector: 'app-eliminar-pais',
  templateUrl: './eliminar-pais.component.html',
  styleUrls: ['./eliminar-pais.component.css']
})
export class EliminarPaisComponent implements OnInit {

  constructor(
    private service: PaisService,
  ) { }

  ngOnInit(): void {
  }


  eliminarPais(idPais: number){
    this.service.eliminarPais(idPais);
    
  }

}
