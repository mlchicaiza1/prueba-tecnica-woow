import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { registerValidation, loginValidation } from "../middlewares/authValidations";

const router = Router();
const authController = new AuthController();

router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);

export default router;
