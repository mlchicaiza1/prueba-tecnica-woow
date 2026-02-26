import { Request, Response } from "express";
import { AuthService } from "../services/authService";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);
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
      const result = await authService.login(req.body);
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
