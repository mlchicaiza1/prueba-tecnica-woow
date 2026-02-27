import { UserResponseDTO } from "./userResponseDto";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDTO {
    @IsEmail({}, { message: "Email inválido" })
    @IsNotEmpty({ message: "El email es requerido" })
    email!: string;

    @IsNotEmpty({ message: "La contraseña es requerida" })
    password!: string;
}

export class AuthResponseDTO {
    token!: string;
    user!: UserResponseDTO;
}

