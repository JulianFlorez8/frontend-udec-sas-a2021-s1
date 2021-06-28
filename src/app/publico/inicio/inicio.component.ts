import { Component, OnInit } from '@angular/core';
import { ProyectoModel } from 'src/app/models/parametrizacion/proyectos.model';
import { BloqueService } from 'src/app/services/parametrizacion/bloque.service';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';
import { ProyectoService } from 'src/app/services/parametrizacion/proyecto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  constructor(private service: ProyectoService,
    private servicioCiudad: CiudadService,
    private servicioPais: PaisService,
    private servicioBloque: BloqueService) {}
  lista:  ProyectoModel[]=[];
  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista() {
    this.service.obtenerProyectos().subscribe(
      (datos) => {
        let codigoPais=0;
        
        datos.forEach(dato=>{
          let contador=0;
          if(dato.codigoCiudad)
          this.servicioCiudad.obtenerCiudad(dato.codigoCiudad).subscribe(
            (ciudad)=>{
              dato.ciudad=ciudad.nombre; 
              codigoPais=ciudad.codigoPais;
              if(codigoPais>0)
              this.servicioPais.obtenerPais(codigoPais).subscribe((pais)=>{dato.pais=pais.nombre});
            });
          if(dato.codigo)
          this.service.obtenerBloquesProyecto(dato.codigo).subscribe((bloques)=>{
            bloques.forEach(bloque=>{
              if(bloque.codigo)
              this.servicioBloque.obtenerBloqueInmueble(bloque.codigo).subscribe(inmuebles=>{
                contador=inmuebles.length+contador;
                console.log(contador);
              dato.inmueblesDisponibles=contador;
              })
            });
          });
          this.lista.push(dato);
        })
        console.log(this.lista);
      },
      (error) => {
        console.log('error');
      }
    );
  }
}
