import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudEstudioModel } from 'src/app/models/ventas/solicitudEstudio.model';
import { SolicitudService } from 'src/app/services/ventas/solicitud.service';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  elementoID: string='';
  constructor(
    private fb: FormBuilder, 
    private service: SolicitudService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.elementoID= this.route.snapshot.params["codigo"];
    }

  ngOnInit(): void {
    this.FormularioValidacion();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      documento: ['', [Validators.required]],
      oferta: ['', [Validators.required]],
    });
  }
  getSolicitudData(): SolicitudEstudioModel {
    let model = new SolicitudEstudioModel();
    model.documentoCliente = parseInt(this.fgv.documento.value);
    model.ofertaEconomica = parseInt(this.fgv.oferta.value);
    model.estado= 'En Estudio';
    model.codigoInmueble=parseInt(this.elementoID);
    let date: Date = new Date();
    let dia='';
    let mes='';
    if(date.getDay()<10)
    {dia='0'+date.getDay();}
    else
    {dia=date.getDay().toString();}
    if (date.getMonth()<10)
    {mes='0'+date.getMonth();}
    else
    {mes=date.getMonth().toString();}
    let fechaActual=date.getFullYear()+'-'+dia+'-'+mes;
    console.log(fechaActual);
    model.fechaSolicitud=fechaActual;
    return model;
  }
  get fgv() {
    return this.fgValidator.controls;
  }


  CrearSolicitud(){
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let solicitud = this.getSolicitudData();
      console.log(solicitud);
      if(solicitud.codigoInmueble)
      this.service.obtenerSolicitudesInmueble(solicitud.codigoInmueble).subscribe((data)=>{
//        console.log(data);
        if(data.length==0)
        {
          this.service.creacionSolicitud(solicitud).subscribe((data) => {
            console.log(data);
            if (data) {
              alert('Registro Exitoso');
            } else {
              alert('Fallo el registro');
            }
          });
          
        }
        else{
          alert('ATENCIÓN: El inmueble ya tiene una solicitud de estudio en estudio');
        }
      })
        
     
      
    }

  }
}
