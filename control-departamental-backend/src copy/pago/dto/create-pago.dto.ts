import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsObject, IsUUID, ValidateNested } from "class-validator";
import { CreateArchivoDto } from "../../archivo/dto/create-archivo.dto";
import { ESTADO_PAGO } from "../entities/pago.entity";
import { ServiciosAsignado } from "../../servicios-asignados/entities/servicios-asignado.entity";



export class CreatePagoDto {
    @IsInt()
    periodicidad: number;

    @IsDate()
    @Type(() => Date)
    fecha_pago: Date;

    @IsDate()
    @Type(() => Date)
    fecha_pagar: Date;

    @IsDate()
    @Type(() => Date)
    fecha_vencimiento: Date;

    @IsEnum(ESTADO_PAGO)
    estado: ESTADO_PAGO;


}

export class CreatePagoArchivoDto {

    @IsObject()
    @ValidateNested()
    @Type(() => CreatePagoDto)
    pago: CreatePagoDto;
    @IsObject()
    @ValidateNested()
    @Type(() => CreateArchivoDto)
    archivo: CreateArchivoDto;

}
