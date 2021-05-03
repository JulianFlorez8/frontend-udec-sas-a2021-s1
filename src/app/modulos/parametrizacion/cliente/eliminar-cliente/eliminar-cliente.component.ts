import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClienteModel } from 'src/app/models/parametrizacion/cliente.model';
import { ClienteService } from 'src/app/services/parametrizacion/cliente.service';
import { SeguridadService } from 'src/app/services/seguridad/seguridad.service';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css']
})
export class EliminarClienteComponent implements OnInit {

  suscripcion?: Subscription;
  fgValidator: FormGroup = this.fb.group({});
  clientes?: ClienteModel[];
  objeto: string | undefined = '';
  constructor(
    private fb: FormBuilder, 
    private service: ClienteService,
    private serviceSeguridad: SeguridadService
  ) { }

  ngOnInit(): void {
    this.FormularioValidacion();
    this.llenarCliente();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      cliente: ['', [Validators.required]],
      
    });
  }

  eliminacionCliente() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let cliente = this.getClienteData();
      this.eliminarCliente(cliente);
    }
  }
  //Obtenego datos del formulario y los paso al modelo de usuario
  getClienteData(): number {
    
    return this.fgv.cliente.value;
  }
  get fgv() {
    return this.fgValidator.controls;
  }
  llenarCliente(){
    this.service.obtenerClientes().subscribe(clientees=>{
      //console.log(paises);
      this.clientes=clientees;
      //console.log(this.paises[0].nombre);
      const selectorProyecto=document.getElementById('cliente');
      this.clientes?.forEach(
        cliente=>{
          const opcion= document.createElement('option');
          let nombrecliente= cliente.Nombre+' '+ cliente.Apellido_1;
          let codigocliente= cliente.Documento;
          if(codigocliente)
          {
            opcion.value = codigocliente.toString();
          opcion.text= nombrecliente;
          }
          
          if(selectorProyecto)
          {
            selectorProyecto.appendChild(opcion);
          }
        }
      )
     
    })
  }
  
  




  eliminarCliente(idBCliente: number){
    this.service.eliminarCliente(idBCliente);
    
  }
}
