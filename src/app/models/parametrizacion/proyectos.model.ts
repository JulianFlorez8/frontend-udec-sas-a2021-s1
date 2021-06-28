import{CiudadModel} from './ciudad.model'
export class ProyectoModel{
    codigo?: number =0;
    nombre: string ='';
    descripcion: string ='';
    imagen: string='';
    DocumentoUsuario: number=0;
    usuario?: string;
    codigoCiudad?: number=0;
    ciudad?:string;
    pais?:string;
    inmueblesDisponibles?:number;
    constructor(){}
}