import { Component, OnInit } from '@angular/core';
import { ProyectoModel } from 'src/app/models/parametrizacion/proyectos.model';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ProyectoService } from '../../../../services/parametrizacion/proyecto.service';

@Component({
  selector: 'app-listar-proyecto',
  templateUrl: './listar-proyecto.component.html',
  styleUrls: ['./listar-proyecto.component.css'],
})
export class ListarProyectoComponent implements OnInit {
  constructor(private service: ProyectoService,
    private servicioUsuario: UsuariosService,
    private servicioCiudad: CiudadService,
    private servicioSeguridad: SeguridadService) {}
  lista: ProyectoModel[] = [];
  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista() {
    this.service.obtenerProyectos().subscribe(
      (datos) => {
        datos.forEach(dato=>{
          if(dato.codigoCiudad)
          this.servicioCiudad.obtenerCiudad(dato.codigoCiudad).subscribe((city)=>{dato.ciudad=city.nombre})
          this.servicioUsuario.obtenerUsuario(dato.DocumentoUsuario).subscribe((user)=>{dato.usuario=user.Nombre+' '+ user.Apellido_1})
        })
        this.lista = datos;
        console.log(this.lista);
      },
      (error) => {
        console.log('error');
      }
    );
  }
  ponerid(id:any, elemento: any){
    console.log("id:"+id);
    this.servicioSeguridad.setIdUnivesal(id,elemento);
    //EliminarPaisComponent.elemento="";
  }
}
