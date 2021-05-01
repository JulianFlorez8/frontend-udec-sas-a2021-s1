import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CiudadModel } from 'src/app/models/parametrizacion/ciudad.model';
import { BloqueService } from 'src/app/services/parametrizacion/bloque.service';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-eliminar-ciudad',
  templateUrl: './eliminar-ciudad.component.html',
  styleUrls: ['./eliminar-ciudad.component.css'],
})
export class EliminarCiudadComponent implements OnInit {
  suscripcion?: Subscription;
  fgValidator: FormGroup = this.fb.group({});
  ciudades?: CiudadModel[];
  objeto: string | undefined = '';
  constructor(
    private fb: FormBuilder,
    private service: CiudadService,
    private serviceSeguridad: SeguridadService
  ) {}

  ngOnInit(): void {
    this.FormularioValidacion();
    this.llenarCiudades();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      ciudad: ['', [Validators.required]],
    });
  }

  eliminacionCiudad() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let ciudad = this.getCiudadData();
      this.eliminarCiudad(ciudad);
    }
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getCiudadData(): number {
    return parseInt(this.fgv.ciudad.value);
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  llenarCiudades() {
    this.service.obtenerCiudadesCompletas().subscribe((bloques) => {
      //console.log(paises);
      this.ciudades = bloques;
      //console.log(this.paises[0].nombre);
      const selectorProyecto = document.getElementById('ciudad');
      this.ciudades?.forEach((bloque) => {
        const opcion = document.createElement('option');
        let nombrebloque = bloque.nombre;
        let codigobloque = bloque.codigo;
        if (codigobloque) {
          opcion.value = codigobloque.toString();
          opcion.text = nombrebloque;
        }

        if (selectorProyecto) {
          selectorProyecto.appendChild(opcion);
        }
      });
    });
  }

  eliminarCiudad(idCiudad: number) {
    this.service.eliminarCiudad(idCiudad);
  }
}
