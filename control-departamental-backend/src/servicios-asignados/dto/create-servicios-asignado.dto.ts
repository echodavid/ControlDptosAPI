import { Type } from "class-transformer";
import { IsObject, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { VALID_ROLES } from "../../auth/interfaces";
import { CreatePagoArchivoDto } from "../../pago/dto/create-pago.dto";
import { UUID } from "crypto";

export class CreateServiciosAsignadoDto {
    @IsString()
    encargado: VALID_ROLES;

    @IsUUID()
    @IsString()
    id_servicio: string;

    @IsUUID()
    @IsOptional()
    id_departamento: UUID;

    @IsObject()
    @ValidateNested()
    @IsOptional()
    @Type(() => CreatePagoArchivoDto)
    pagoArchivo: CreatePagoArchivoDto;

    

}
