import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/parametrizacion/cliente.service';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css']
})
export class EliminarClienteComponent implements OnInit {

  constructor(
    private service: ClienteService,
  ) { }

  ngOnInit(): void {
  }


  eliminarCliente(idBCliente: number){
    this.service.eliminarCliente(idBCliente);
    
  }
}
