import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { UserRole } from "../models/User";

export class CreateUserDTO {
    @IsNotEmpty({ message: "El nombre es requerido" })
    name!: string;

    @IsEmail({}, { message: "Email inválido" })
    @IsNotEmpty({ message: "El email es requerido" })
    email!: string;

    @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    @IsNotEmpty({ message: "La contraseña es requerida" })
    password!: string;

    
    role!: UserRole;
}