import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwt";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
          res.status(401).json({ message: "Token no proporcionado" });
            return;
        }

        const decoded = verifyToken(token);
        if (!decoded) {
          res.status(401).json({ message: "Token inválido" });
            return;
        }

        req.user = decoded as any;
        next();
    } catch (error) {
        res.status(401).json({ message: "Error de autenticación" });
    }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Acceso denegado, se requiere rol de administrador" });
  }
};

