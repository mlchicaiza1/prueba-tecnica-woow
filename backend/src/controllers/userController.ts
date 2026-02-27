import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { AuthRequest } from "../middlewares/authMiddleware";
import { injectable, inject } from "tsyringe";

@injectable()
export class UserController {
  constructor(@inject("UserService") private userService: UserService) {}

  getProfile = async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user) {
         res.status(401).json({ error: "No autenticado" });
         return;
      }
      const user = await this.userService.getProfile(req.user.userId);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  }

  updateProfile = async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user) {
         res.status(401).json({ error: "No autenticado" });
         return;
      }

      const user = await this.userService.updateProfile(req.user.userId, req.body);
      res.status(200).json({ message: "Perfil actualizado", user });
    } catch (error: any) {
      res.status(400).json({ error: "No se pudo actualizar el perfil" });
    }
  }

  listUsers = async (req: Request, res: Response) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const filters = {
        name: req.query.name as string | undefined,
        email: req.query.email as string | undefined,
        role: req.query.role as string | undefined,
      };

      const result = await this.userService.listUsers(page, limit, filters);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
