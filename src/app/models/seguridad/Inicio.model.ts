import {UsuarioModel} from '../usuario.model';
export class InicioModel{
    usuario?: UsuarioModel;
    token?: String='';
    logeado: boolean=false;
    elemento?: string;
    codigo?: number;
  constructor(){}
}