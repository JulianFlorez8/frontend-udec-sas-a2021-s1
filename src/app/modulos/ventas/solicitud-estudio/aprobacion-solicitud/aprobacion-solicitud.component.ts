import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudEstudioModel } from 'src/app/models/ventas/solicitudEstudio.model';
import { SolicitudService } from 'src/app/services/ventas/solicitud.service';

@Component({
  selector: 'app-aprobacion-solicitud',
  templateUrl: './aprobacion-solicitud.component.html',
  styleUrls: ['./aprobacion-solicitud.component.css']
})
export class AprobacionSolicitudComponent implements OnInit {
  x: SolicitudEstudioModel= new SolicitudEstudioModel;
  elementoID: number=0;
  constructor(
    private service: SolicitudService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.elementoID= this.route.snapshot.params["codigo"];
    }
    

  ngOnInit(): void {
    this.getSolicitudActual();
  }

  getSolicitudActual(){
    this.service.obtenerSolicitud(this.elementoID).subscribe(
      data =>{
        this.x=data;
       
      },
      error =>{
        alert('No se encontro el elemento');
       this.router.navigate(["/ventas/listar-solicitud"]);
      }
    )

  }
  
  ActualizarSolicitud(nuevoEstado: string) {
      let solicitud = this.x;
      if(solicitud)
      {
        solicitud.estado=nuevoEstado;
        this.service.actualizarSolicitud(this.elementoID,solicitud).subscribe((data) => {
            alert('Actualizacion Exitosa');// LAS ACTUALIZACIONES NO RETORNAN NADA, ES DECIR LO QUE VIENE ES null
            this.router.navigate(["/inicio"]);
        });
      }
      
     
    
  
  }
  //Obtenego datos del formulario y los paso al modelo de usuario

Aceptar(){
  this.ActualizarSolicitud("Aceptada");
}
Rechazar(){
  this.ActualizarSolicitud("Rechazada");
}
}
