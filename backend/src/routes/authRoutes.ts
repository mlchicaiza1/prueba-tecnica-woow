import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { container } from "tsyringe";
import { CreateUserDTO } from "../dtos/CreateUserDto";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { LoginUserDTO } from "../dtos/authDto";
const router = Router();
const authController = container.resolve(AuthController);

router.post("/register", validationMiddleware(CreateUserDTO), authController.register);
router.post("/login", validationMiddleware(LoginUserDTO), authController.login);

export default router;
