import { IsEmail, IsOptional, MinLength } from "class-validator";

export class UpdateUserDTO {
    @IsOptional()
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: "Email inválido" })
    email?: string;

    @IsOptional()
    @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    password?: string;
}