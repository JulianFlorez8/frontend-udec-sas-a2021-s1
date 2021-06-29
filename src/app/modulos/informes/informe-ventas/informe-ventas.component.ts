import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { SolicitudService } from 'src/app/services/ventas/solicitud.service';
@Component({
  selector: 'app-informe-ventas',
  templateUrl: './informe-ventas.component.html',
  styleUrls: ['./informe-ventas.component.css']
})
export class InformeVentasComponent implements OnInit {
  aceptadas: number=0;
  rechazadas: number=0;
  enEstudio: number=0;
  torta: boolean=false;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = ['Inmuebles'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
 
  public barChartData: ChartDataSets[] = [
    { data: [this.aceptadas], label: 'Aceptadas' },
    { data: [this.enEstudio], label: 'En Estudio' },
    { data: [this.rechazadas], label: 'Rechazadas' }
  ];
  //ZONA TORTA
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
    }
  };
  public pieChartLabels: Label[] = [['Aceptadas'], ['En', 'Estudio'], 'Rechazadas'];
  public pieChartData: number[] = [this.aceptadas, this.enEstudio, this.rechazadas];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor(
    private servicio: SolicitudService
  ) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    switch ( this.torta ) {
      case true:
        
          this.torta=false;
          
          break;
      case false:
          
        this.torta=true;
          break;
      default: 
          // 
          break;
      
   }
  }
  obtenerDatos(){
    this.servicio.obtenerSolicitudes().subscribe((solicitudes)=>{
      this.aceptadas=0;
      this.rechazadas=0;
      this.enEstudio=0;
      solicitudes.forEach(solicitud=>{
        switch ( solicitud.estado ) {
          case 'Aceptada':
              this.aceptadas++;
              break;
          case 'Rechazada':
              this.rechazadas++;
              break;
          case 'En Estudio':
              this.enEstudio++;
              break;
          default: 
              // 
              break;
          
       }
      });
      console.log(solicitudes);
      //console.log(this.aceptadas+' '+this.rechazadas+' '+this.enEstudio)
      this.barChartData= [
        { data: [this.aceptadas], label: 'Aceptadas' },
        { data: [this.enEstudio], label: 'En Estudio' },
        { data: [this.rechazadas], label: 'Rechazadas' }
      ];
      this.pieChartData=[this.aceptadas, this.enEstudio, this.rechazadas]
    })
    
  }
}