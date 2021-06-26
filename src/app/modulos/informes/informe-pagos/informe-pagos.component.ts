import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteModel } from 'src/app/models/ventas/cliente.model';
import { CiudadService } from 'src/app/services/parametrizacion/ciudad.service';
import { ClienteService } from 'src/app/services/ventas/cliente.service';
import { PaisService } from 'src/app/services/parametrizacion/pais.service';

@Component({
  selector: 'app-informe-pagos',
  templateUrl: './informe-pagos.component.html',
  styleUrls: ['./informe-pagos.component.css']
})
export class InformePagosComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({});
  clientes?: ClienteModel[];
  constructor(
    
    private fb: FormBuilder, 
    private service: CiudadService,
    private servicioClientes: ClienteService,
    ) {}
  ngOnInit(): void {
    this.llenarClientes();
    this.FormularioValidacion();
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      cliente: ['', [Validators.required]]
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
        this.generarGrafica(idCliente);
  })
    }
  }
  generarGrafica(idCliente: number){
    console.log(idCliente);
    
  }
}
