import { body } from "express-validator";

export const updateProfileValidation = [
  body("name").optional().notEmpty().withMessage("El nombre no puede estar vacío si se proporciona"),
];
