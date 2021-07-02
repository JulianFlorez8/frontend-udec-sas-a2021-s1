export class ClienteModel{
    Documento: number=0;
    Nombre: string= '';
    Apellido_1: string='';
    Apellido_2?: string;
    Fecha_Nacimiento: string='';
    Foto?: string;
    Celular: number=0;
    Correo: string='';
    Direccion: string='';
    Total_Ingresos: number=0;
    Datos_Trabajo?: string;
    Nombre_Ref_Familiar: string='';
    Telefono_Ref_Familiar: string='';
    Nombre_Ref_Personal: string='';
    Telefono_Ref_Personal: string='';
    DocumentoUsuario: number=0;
    codigoCiudad: number=0;
    ciudad?: string;
    constructor(){}
}
