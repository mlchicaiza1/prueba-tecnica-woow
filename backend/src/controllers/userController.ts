import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { AuthRequest } from "../middlewares/authMiddleware";

const userService = new UserService();

export class UserController {
  async getProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
         res.status(401).json({ error: "No autenticado" });
         return;
      }
      const user = await userService.getProfile(req.user.userId);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  }

  async updateProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
         res.status(401).json({ error: "No autenticado" });
         return;
      }
      const user = await userService.updateProfile(req.user.userId, req.body);
      res.status(200).json({ message: "Perfil actualizado", user });
    } catch (error: any) {
      res.status(400).json({ error: "No se pudo actualizar el perfil" });
    }
  }

  async listUsers(req: Request, res: Response) {
    try {
      const users = await userService.listUsers();
      res.status(200).json({ users });
    } catch (error: any) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
