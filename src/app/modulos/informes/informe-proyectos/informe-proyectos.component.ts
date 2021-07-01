import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisModel } from 'src/app/models/parametrizacion/pais.model';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
import { ProyectoService } from 'src/app/services/parametrizacion/proyecto.service';
import { BloqueService } from 'src/app/services/parametrizacion/bloque.service';
import { SolicitudService } from 'src/app/services/ventas/solicitud.service';
@Component({
  selector: 'app-informe-proyectos',
  templateUrl: './informe-proyectos.component.html',
  styleUrls: ['./informe-proyectos.component.css'],
})
export class InformeProyectosComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  paises: PaisModel[] = [];
  ciudades: CiudadModel[] = [];
  vendidos: number = 0;
  noVendidos: number = 0;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    legend: {
      display: true,
      labels: {
        fontColor: 'white',
      },
    },
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = ['sitio'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public chartColors: any[] = [
    {
      backgroundColor: ['rgba(0, 0, 0, 0.233)', 'rgba(240, 76, 112, 0.562)'],
    },
  ];

  public barChartData: ChartDataSets[] = [
    { data: [this.vendidos], label: 'Inmuebles vendidos' },
    { data: [this.noVendidos], label: 'Inmuebles sin Vender' },
  ];

  constructor(
    private fb: FormBuilder,
    private servicioPaises: PaisService,
    private servicioCiudad: CiudadService,
    private servicioProyecto: ProyectoService,
    private servicioBloque: BloqueService,
    private servicioSolicitudes: SolicitudService
  ) {}

  ngOnInit(): void {
    this.FormularioValidacion();
    this.obtenerPaises();
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      pais: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
    });
  }
  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    switch (this.barChartType) {
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
  }
  obtenerPaises() {
    this.servicioPaises.obtenerPaises().subscribe((paises) => {
      this.paises = paises;
    });

    const selectorPais = document.getElementById('pais');
    if (selectorPais) {
      selectorPais.addEventListener('change', (e) => {
        //me permite ver cuando estoy cambiando de opcion
        const list = e.target;
        let idPais = this.fgv.pais.value;
        this.ciudades = [];
        //this.busquedaPais(idPais);//NO USAR ACTUALMENTE, DEMASIADO PESADA LA BUSQUEDA
        this.llenarCiudades(idPais);
      });
    }
  }
  llenarCiudades(id: number) {
    this.servicioPaises.obtenerCiudadesPais(id).subscribe((ciudades) => {
      this.ciudades = ciudades;
    });
    const selectorCiudad = document.getElementById('ciudad');
    if (selectorCiudad) {
      selectorCiudad.addEventListener('change', (e) => {
        //me permite ver cuando estoy cambiando de opcion
        const list = e.target;
        let idCiudad = this.fgv.ciudad.value;
        console.log('x');
        this.busquedaCiudad(idCiudad);
      });
    }
  }
  busquedaPais(id: number) {
    this.servicioPaises.obtenerCiudadesPais(id).subscribe((ciudades) => {
      ciudades.forEach((ciudad) => {
        if (ciudad.codigo)
          this.servicioCiudad
            .obtenerProyectoCiudad(ciudad.codigo)
            .subscribe((proyectos) => {
              proyectos.forEach((proyecto) => {
                if (proyecto.codigo)
                  this.servicioProyecto
                    .obtenerBloquesProyecto(proyecto.codigo)
                    .subscribe((bloques) => {
                      bloques.forEach((bloque) => {
                        if (bloque.codigo)
                          this.servicioBloque
                            .obtenerBloqueInmueble(bloque.codigo)
                            .subscribe((inmuebles) => {
                              inmuebles.forEach((inmueble) => {
                                if (inmueble.codigo)
                                  this.servicioSolicitudes
                                    .obtenerSolicitudesTotalesInmueble(
                                      inmueble.codigo
                                    )
                                    .subscribe((solicitudes) => {
                                      console.log(solicitudes);
                                      solicitudes.forEach((solicitud) => {
                                        this.noVendidos = this.noVendidos + 1;
                                        if (solicitud.estado == 'Aceptada') {
                                          this.vendidos = this.vendidos + 1;
                                          console.log('vendido');
                                        }
                                      });
                                      this.barChartData = [
                                        {
                                          data: [this.vendidos],
                                          label: 'Inmuebles vendidos',
                                        },
                                        {
                                          data: [
                                            this.noVendidos - this.vendidos,
                                          ],
                                          label: 'Inmuebles sin Vender',
                                        },
                                      ];
                                      console.log(
                                        this.vendidos + ' ' + this.noVendidos
                                      );
                                    });
                              });
                            });
                      });
                    });
              });
            });
      });
    });
  }
  busquedaCiudad(id: number) {
    this.vendidos = 0;
    this.noVendidos = 0;
    this.servicioCiudad.obtenerProyectoCiudad(id).subscribe((proyectos) => {
      proyectos.forEach((proyecto) => {
        if (proyecto.codigo)
          this.servicioProyecto
            .obtenerBloquesProyecto(proyecto.codigo)
            .subscribe((bloques) => {
              bloques.forEach((bloque) => {
                if (bloque.codigo)
                  this.servicioBloque
                    .obtenerBloqueInmueble(bloque.codigo)
                    .subscribe((inmuebles) => {
                      inmuebles.forEach((inmueble) => {
                        if (inmueble.codigo)
                          this.servicioSolicitudes
                            .obtenerSolicitudesTotalesInmueble(inmueble.codigo)
                            .subscribe((solicitudes) => {
                              console.log(solicitudes);
                              solicitudes.forEach((solicitud) => {
                                this.noVendidos = this.noVendidos + 1;
                                if (solicitud.estado == 'Aceptada') {
                                  this.vendidos = this.vendidos + 1;
                                  console.log('vendido');
                                }
                              });
                              this.barChartData = [
                                {
                                  data: [this.vendidos],
                                  label: 'Inmuebles vendidos',
                                },
                                {
                                  data: [this.noVendidos - this.vendidos],
                                  label: 'Inmuebles sin Vender',
                                },
                              ];
                              console.log(
                                this.vendidos + ' ' + this.noVendidos
                              );
                            });
                      });
                    });
              });
            });
      });
    });
  }
}
