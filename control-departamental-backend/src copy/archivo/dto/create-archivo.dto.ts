import { IsOptional, IsString } from "class-validator";

export class CreateArchivoDto {

    @IsString()
    @IsOptional()
    nombre: string;

    @IsString()
    tipo: string;

    @IsString()
    url: string;

    

}
