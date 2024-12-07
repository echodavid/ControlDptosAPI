import { IsString } from "class-validator";


export class CreateServicioDto {

    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

}

export enum ESTADO_SERVICE {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo'
}

