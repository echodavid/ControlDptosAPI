import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { VALID_ROLES } from "../interfaces";
import { Transform, Type } from "class-transformer";

export class CreateUserDto {


    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    @MinLength(3)
    nombre: string;

    @IsString()
    @MinLength(3)
    apellido: string;

    @IsOptional()
    @IsString()
    rol: VALID_ROLES

    @IsOptional()
    @IsString()
    telefono: string;



}