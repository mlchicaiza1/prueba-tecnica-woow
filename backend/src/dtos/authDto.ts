import { UserRole } from "../models/User";
import { UserResponseDto } from "./userDto";

export interface RegisterRequestDto {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  token: string;
  user: UserResponseDto;
}
