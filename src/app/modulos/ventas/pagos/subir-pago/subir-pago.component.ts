import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PagosModel } from 'src/app/models/ventas/pagos.model';
import { ArchivosService } from 'src/app/services/parametrizacion/archivos.service';
import { PagoService } from 'src/app/services/ventas/pago.service';
import { SolicitudService } from 'src/app/services/ventas/solicitud.service';

@Component({
  selector: 'app-subir-pago',
  templateUrl: './subir-pago.component.html',
  styleUrls: ['./subir-pago.component.css']
})
export class SubirPagoComponent implements OnInit {

  fgValidator: FormGroup = this.fb.group({});
  uploadForm: FormGroup = this.fb.group({});
  elementoID:string='';
  imagen?: String;
  constructor(
    private servicioSubida: ArchivosService,
    private fb: FormBuilder,
    private service: PagoService,
    private servicioSolicitudes: SolicitudService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.elementoID= this.route.snapshot.params["codigo"];
    }

  ngOnInit(): void {
    this.construirFormularioCarga();
    this.FormularioValidacion();
  }
  FormularioValidacion() {
    this.fgValidator = this.fb.group({
      valor: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }
  get fgv() {
    return this.fgValidator.controls;
  }

  getProyectoData(): PagosModel {
    let model = new PagosModel();
    model.codigoSolicitud=parseInt(this.elementoID);//Duda si quitar o no
    model.valor= parseInt(this.fgv.valor.value);
    model.recibo_consignacion = this.fgv.image.value.toString();

    return model;
  }
  RegitrarPago() {
    if (this.fgValidator.invalid) {
      alert('Formulario Invalido');
    } else {
      let pago = this.getProyectoData();
      console.log(pago);
      if(pago.codigoSolicitud)
      this.servicioSolicitudes.obtenerPagosSolicitud(pago.codigoSolicitud).subscribe(pagos=>{
        let pagado=0;
        pagos.forEach(pago=>{
          pagado=pagado+pago.valor;
        })
    let pagare= pagado+pago.valor;
    if(pago.codigoSolicitud)
      this.servicioSolicitudes.obtenerSolicitud(pago.codigoSolicitud).subscribe(x=>{
        if(x.ofertaEconomica)
        if(pagare<=x.ofertaEconomica)
        {

          this.service.creacionPago(pago).subscribe((data) => {
            console.log(data);
            if (data) {
              alert('Pago Exitoso');
              this.router.navigate(["/inicio"]);
            } else {
              alert('Fallo el registro');
            }
          });
        }
        else{
          alert('Existe eun excedente en el pago');
        }
        
      })
      
    })
    }
  }

  //CARGA DE IMAGEN
  construirFormularioCarga() {
    this.uploadForm = this.fb.group({
      file: ['', [Validators.required]],
    });
  }
  get fgUpload() {
    return this.uploadForm.controls;
  }
  cargarRecibo() {
    const formData = new FormData();
    formData.append('file', this.fgUpload.file.value);
    //LLamar Servicio
    this.servicioSubida.cargarRecibo(formData).subscribe(
      (data) => {
        this.fgv.image.setValue(data.filename);
      },
      (err) => {
        alert('Error al cargar el recibo');
      }
    );
  }
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const f = event.target.files[0];
      this.fgUpload.file.setValue(f);
    }
  }
}
