import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteModel } from 'src/app/models/ventas/cliente.model';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { ClienteService } from 'src/app/services/ventas/cliente.service';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';
import { ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, ThemeService } from 'ng2-charts';
import { SolicitudService } from 'src/app/services/ventas/solicitud.service';
import { InmuebleService } from 'src/app/services/parametrizacion/inmueble.service';
import { InmuebleModel } from 'src/app/models/parametrizacion/inmueble.model';
@Component({
  selector: 'app-informe-pagos',
  templateUrl: './informe-pagos.component.html',
  styleUrls: ['./informe-pagos.component.css']
})
export class InformePagosComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  clientes?: ClienteModel[];
  inmueble?: string;
  inmuebles: InmuebleModel[]=[];
  total: number=0;
  pagado: number=0;
  faltante:number=this.getFaltante();
  cantidadInmuebles: number=this.inmuebles.length;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [ ['Saldo', 'Faltante'],['Saldo', 'Pagado']];
  public pieChartData: SingleDataSet = [0, 0 ];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    
    private fb: FormBuilder, 
    private service: CiudadService,
    private servicioClientes: ClienteService,
    private servicioSolicitud: SolicitudService,
    private servicioInmueble: InmuebleService
    ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  ngOnInit(): void {
    this.llenarClientes();
    this.FormularioValidacion();
  }
  getFaltante():number{
    let x=this.total-this.pagado;
    return x;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      cliente: ['', [Validators.required]],
      inmuebles:['', [Validators.required]]
    });
  }
  
  llenarClientes(){
    const selectorCliente=document.getElementById('cliente');
    this.servicioClientes.obtenerClientes().subscribe(clientes=>{
      this.clientes=clientes;
      this.clientes?.forEach(
        cliente=>{
          const opcion= document.createElement('option');
          let nombreCliente= cliente.Nombre+', con Documento: '+ cliente.Documento;
          let codigoCliente= cliente.Documento;
          if (codigoCliente)
          {
             opcion.value = codigoCliente.toString();
          opcion.text= nombreCliente;

          }
          if(selectorCliente)
          {
            selectorCliente.appendChild(opcion);
          }
        }
      )
     
    })
    if (selectorCliente)
    {
      selectorCliente.addEventListener('change', e => { //me permite ver cuando estoy cambiando de opcion
        const list = e.target;
        let idCliente=this.fgv.cliente.value
        //console.log(idCliente);
        this.inmuebles=[];
        this.generarGrafica(idCliente);
  })
    }
  }
  generarGrafica(idCliente: number){
    console.log(idCliente);
    this.servicioSolicitud.obtenerSolicitudesCliente(idCliente).subscribe((inmuebles)=>{
      
      inmuebles.forEach(element => {
        this.total=0;
        if(element.ofertaEconomica)
        this.total=element.ofertaEconomica;
        if(element.codigoInmueble)
        this.servicioInmueble.obtenerInmueble(element.codigoInmueble).subscribe((inmueble)=>{
          //this.inmueble=inmueble.identificador;
          this.inmuebles.push(inmueble);
          if(element.codigo)
          this.llenarInmuebles(element.codigo);
        })
      });
      
    })

    
  }
  llenarInmuebles(id: number){
    const selectorInmueble=document.getElementById('inmuebles');
    if (selectorInmueble)
    {
      selectorInmueble.addEventListener('change', e => { //me permite ver cuando estoy cambiando de opcion
        const list = e.target;
        let id=this.fgv.inmuebles.value
        //console.log(idCliente);
        this.servicioSolicitud.obtenerSolicitud(id).subscribe((elemento)=>{
          this.total=0;
          if(elemento.ofertaEconomica)
          this.total=elemento.ofertaEconomica;
         // console.log('total'+this.total)
        })
        this.servicioSolicitud.obtenerPagosSolicitud(id).subscribe((pagos)=>{
          this.pagado=0;
          pagos.forEach(pago=>{
            //console.log(pago);
            this.pagado=this.pagado+pago.valor;
            //console.log(this.pagado);
          });
          this.pieChartData = [this.total-this.faltante, this.pagado ];
        })
        //console.log(id);
  })
    }
  }
}