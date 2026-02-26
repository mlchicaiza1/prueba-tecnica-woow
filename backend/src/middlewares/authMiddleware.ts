import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET || "secret_jwt_key_woow", (err, user) => {
      if (err) {
        res.status(403).json({ error: "Token inválido o expirado" });
        return;
      }
      req.user = user as any;
      next();
    });
  } else {
    res.status(401).json({ error: "No se proporcionó token de autenticación" });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Acceso denegado, se requiere rol de administrador" });
  }
};

