import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateJWT, requireAdmin } from "../middlewares/authMiddleware";
import { container } from "tsyringe";
import { UpdateUserDTO } from "../dtos/UpdateUserDto";
import { validationMiddleware } from "../middlewares/validationMiddleware";

const router = Router();
const userController = container.resolve(UserController);

// All routes here require authentication
router.use(authenticateJWT);
router.get("/me", userController.getProfile);
router.put("/me", validationMiddleware(UpdateUserDTO), userController.updateProfile);

router.get("/", requireAdmin, userController.listUsers);

export default router;
