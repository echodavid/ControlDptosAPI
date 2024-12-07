import { IsObject, IsString, IsUUID, MinLength } from "class-validator";
import { UUID } from "crypto";

export class CreateNotDto {

    @IsString()
    @MinLength(3)
    tipo: string;

    @IsString()
    @MinLength(3)
    titulo: string;

    @IsString()
    @MinLength(3)
    descripcion: string;

    @IsString()
    @IsUUID()
    user_id: UUID;



}
