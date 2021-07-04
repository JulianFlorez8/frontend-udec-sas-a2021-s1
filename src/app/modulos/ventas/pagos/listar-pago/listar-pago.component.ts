import { Component, OnInit } from '@angular/core';
import { PagosModel } from 'src/app/models/ventas/pagos.model';
import { SolicitudEstudioModel } from 'src/app/models/ventas/solicitudEstudio.model';
import { PagoService } from 'src/app/services/ventas/pago.service';
import { SolicitudService } from 'src/app/services/ventas/solicitud.service';

@Component({
  selector: 'app-listar-pago',
  templateUrl: './listar-pago.component.html',
  styleUrls: ['./listar-pago.component.css']
})
export class ListarPagoComponent implements OnInit {
  constructor(private service: SolicitudService) {}
  lista: SolicitudEstudioModel[] = [];
  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista() {
    this.service.obtenerSolicitudesAceptadas().subscribe(
      (datos) => {
        datos.forEach(dato=>{
          if(dato.codigo)
          this.service.obtenerPagosSolicitud(dato.codigo).subscribe(pagos=>{
            let pagado=0;
            pagos.forEach(pago=>{
              pagado=pagado+pago.valor;
            })
            if(dato.ofertaEconomica)
            {dato.falta=dato.ofertaEconomica-pagado;
            if(dato.falta>0)
            this.lista.push(dato)}
          })
          
        })
      },
      (error) => {
        console.log('error');
      }
    );
  }
}