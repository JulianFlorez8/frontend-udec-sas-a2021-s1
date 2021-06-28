import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts'
@Component({
  selector: 'app-informe-proyectos',
  templateUrl: './informe-proyectos.component.html',
  styleUrls: ['./informe-proyectos.component.css']
})
export class InformeProyectosComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Inmuebles vendidos' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Inmuebles sin Vender' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    switch ( this.barChartType ) {
      case 'bar':
          this.barChartType = 'line';
          break;
      case 'line':
          this.barChartType = 'pie';
          break;
      case 'pie':
          this.barChartType = 'horizontalBar';
          break;
      case 'horizontalBar':
          this.barChartType = 'radar';
          break;
      case 'radar':
          this.barChartType = 'doughnut';
          break;
      case 'doughnut':
          this.barChartType = 'polarArea';
          break;
      case 'polarArea':
          this.barChartType = 'bar';
          break;
      default: 
          // 
          break;
      
   }
   //console.log(this.barChartType)
    //if(this.barChartType === 'bar')
    //{this.barChartType = 'line';}
    //if(this.barChartType === 'line')
    //this.barChartType = 'pie';
    //if(this.barChartType === 'pie')
    //this.barChartType = 'bar';
    //this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}