import{CiudadModel} from './ciudad.model'
export class ProyectoModel{
    codigo?: number ;
    nombre: string ='';
    descripcion: string ='';
    imagen: string='';
    DocumentoUsuario: number=0;
    usuario?: string;
    codigoCiudad?: number;
    ciudad?:string;
    pais?:string;
    inmueblesDisponibles?:number;
    constructor(){}
}