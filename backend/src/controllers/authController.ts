import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { LoginUserDTO } from "../dtos/authDto";
import { injectable, inject } from "tsyringe";
import { CreateUserDTO } from "../dtos/CreateUserDto";

@injectable()
export class AuthController {
  constructor(@inject("AuthService") private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    try {
      const data: CreateUserDTO = req.body;
      const user = await this.authService.register(data);
      res.status(201).json({ message: "Usuario registrado exitosamente", user });
    } catch (error: any) {
      if (error.message === "Email is already registered") {
        res.status(400).json({ error: "El email ya está registrado" });
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const data: LoginUserDTO = req.body;
      const result = await this.authService.login(data);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === "Invalid credentials") {
        res.status(401).json({ error: "Credenciales inválidas" });
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  }
}
