import { body } from "express-validator";

export const registerValidation = [
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("email").isEmail().withMessage("Debe ser un email válido"),
  body("password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Debe ser un email válido"),
  body("password").notEmpty().withMessage("La contraseña es requerida"),
];
