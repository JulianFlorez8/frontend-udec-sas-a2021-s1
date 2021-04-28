import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BloqueModel } from 'src/app/models/parametrizacion/bloque.model';
import { BloqueService } from 'src/app/services/parametrizacion/bloque.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-eliminar-bloque',
  templateUrl: './eliminar-bloque.component.html',
  styleUrls: ['./eliminar-bloque.component.css']
})
export class EliminarBloqueComponent implements OnInit {

  suscripcion?: Subscription;

  objeto: string | undefined = '';
  constructor(
    private service: BloqueService,
    private serviceSeguridad: SeguridadService
  ) { }

  ngOnInit(): void {
    
      this.objeto = this.identificarBloque();
  }
  identificarBloque(){
    return 'objeto'
  }


  eliminarBloque(idBloque: number){
    this.service.eliminarBloque(idBloque);
    
  }

}
