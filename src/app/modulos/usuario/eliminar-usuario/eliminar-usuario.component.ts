import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {
  constructor(
    private fb: FormBuilder, 
    private service: UsuariosService,
    private serviceSeguridad: SeguridadService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
    }
    elementoID?: number;
    elemento?: string;
    suscripcion?: Subscription;
  ngOnInit(): void {
    this.suscripcion = this.serviceSeguridad.getDatosUsuario().subscribe((data) => {
      this.elementoID=data.codigo;
      this.elemento=data.elemento;
    });
  }
  eliminarElemento(){
    console.log("Eliminando "+ this.serviceSeguridad.getElementoUniversal())
    this.service.eliminarUsuario(this.serviceSeguridad.getIdUniversal());
    
  }

}
