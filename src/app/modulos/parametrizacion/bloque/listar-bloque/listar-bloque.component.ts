import { Component, OnInit } from '@angular/core';
import { BloqueModel } from 'src/app/models/parametrizacion/bloque.model';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';
import { BloqueService } from '../../../../services/parametrizacion/bloque.service';

@Component({
  selector: 'app-listar-bloque',
  templateUrl: './listar-bloque.component.html',
  styleUrls: ['./listar-bloque.component.css'],
})
export class ListarBloqueComponent implements OnInit {
  constructor(private service: BloqueService,
    private servicioSeguridad: SeguridadService) {}
  lista: BloqueModel[] = [];
  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista() {
    this.service.obtenerBloques().subscribe(
      (datos) => {
        datos.forEach((dato)=>{
          if(dato.codigoProyecto)
          this.service.obtenerProyectoBloque(dato.codigoProyecto).subscribe((proyect)=>{
            dato.proyecto=proyect.nombre;
          })
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
