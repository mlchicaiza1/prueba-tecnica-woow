import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { registerValidation, loginValidation } from "../middlewares/authValidations";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();
const authController = new AuthController();

router.post("/register", registerValidation, validateRequest, authController.register);
router.post("/login", loginValidation, validateRequest, authController.login);

export default router;
