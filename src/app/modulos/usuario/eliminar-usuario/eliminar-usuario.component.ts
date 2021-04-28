import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {

  constructor(
    private service: UsuariosService,
  ) { }

  ngOnInit(): void {
  }


  eliminarUsuario(idUsuario: number){
    this.service.eliminarUsuario(idUsuario);
    
  }


}
