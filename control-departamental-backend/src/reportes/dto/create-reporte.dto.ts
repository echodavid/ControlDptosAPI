import { IsDate, IsEnum, IsObject, IsOptional, IsString } from "class-validator";
import { ESTADO_REPORTE } from "../entities/reporte.entity";
import { ServiciosAsignado } from "../../servicios-asignados/entities/servicios-asignado.entity";


export class CreateReporteDto {
    @IsString()
    descripcion: string;

    @IsOptional()
    servicio_asignado: ServiciosAsignado;

    @IsOptional()
    @IsEnum(ESTADO_REPORTE)
    estado: ESTADO_REPORTE;

}

