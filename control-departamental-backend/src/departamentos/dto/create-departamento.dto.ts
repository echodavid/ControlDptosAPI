import { IsArray, IsBoolean, IsDate, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateUbicacionArchivoDto } from "../../ubicacion/dto/create-ubicacion.dto";
import { Type } from "class-transformer";
import { CreateServiciosAsignadoDto } from "../../servicios-asignados/dto/create-servicios-asignado.dto";



export class CreateDepartamentoDto {

    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

    @IsBoolean()
    @IsOptional()
    estado: boolean;

    @IsNumber()
    valoracion: number;

    @IsDate()
    @Type(() => Date)
    fecha_construccion: Date;

    @IsNumber()
    apreciacion: number;

    @IsNumber()
    habitaciones: number;

    @IsNumber()
    banos: number;



}


export class CreateDepartamentoUbicacionDto {

    @IsObject()
    @ValidateNested()
    @Type(() => CreateUbicacionArchivoDto)
    ubicacion: CreateUbicacionArchivoDto;
    @IsObject()
    @ValidateNested()
    @Type(() => CreateDepartamentoDto)
    departamento: CreateDepartamentoDto;

    @IsArray()
    @ValidateNested()
    @Type(() => CreateServiciosAsignadoDto)
    @IsOptional()
    serviciosAsignados: CreateServiciosAsignadoDto[];

}