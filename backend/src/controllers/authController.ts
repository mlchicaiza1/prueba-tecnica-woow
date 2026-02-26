import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { RegisterRequestDto, LoginRequestDto } from "../dtos/authDto";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const data: RegisterRequestDto = req.body;
      const user = await authService.register(data);
      res.status(201).json({ message: "Usuario registrado exitosamente", user });
    } catch (error: any) {
      if (error.message === "Email is already registered") {
        res.status(400).json({ error: "El email ya está registrado" });
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data: LoginRequestDto = req.body;
      const result = await authService.login(data);
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
