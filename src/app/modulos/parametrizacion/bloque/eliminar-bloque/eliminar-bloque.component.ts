import { Component, OnInit } from '@angular/core';
import { BloqueService } from 'src/app/services/parametrizacion/bloque.service';

@Component({
  selector: 'app-eliminar-bloque',
  templateUrl: './eliminar-bloque.component.html',
  styleUrls: ['./eliminar-bloque.component.css']
})
export class EliminarBloqueComponent implements OnInit {

  constructor(
    private service: BloqueService,
  ) { }

  ngOnInit(): void {
  }


  eliminarBloque(idBloque: number){
    this.service.eliminarBloque(idBloque);
    
  }

}
