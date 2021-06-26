import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PagosModel } from 'src/app/models/parametrizacion/pagos.model';
import { ArchivosService } from 'src/app/services/parametrizacion/archivos.service';
import { PagoService } from 'src/app/services/parametrizacion/pago.service';

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
