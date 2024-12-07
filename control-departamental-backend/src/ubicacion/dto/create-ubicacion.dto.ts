import { isAlphanumeric, IsAlphanumeric, IsNumber, IsNumberString, IsObject, IsOptional, IsString, IsUUID, Length, Min, ValidateNested } from "class-validator";
import { CreateArchivoDto } from "../../archivo/dto/create-archivo.dto";
import { Type } from "class-transformer";




export class CreateUbicacionDto {
    

    
    @IsNumberString()
    @Length(5,5)
    cod_postal: string;

    @IsString()
    estado: string;

    @IsString()
    municipio: string;

    @IsString()
    colonia: string;

    @IsString()
    calle: string;

    @IsString()
    num_ext: string;

    @IsString()
    @IsOptional()
    num_int: string;

}
export class CreateUbicacionArchivoDto {
    @IsObject()
    @ValidateNested()
    @Type(() => CreateUbicacionDto)
    ubicacion: CreateUbicacionDto;
    @IsObject()
    @ValidateNested()
    @Type(() => CreateArchivoDto)
    archivo: CreateArchivoDto;
  }
