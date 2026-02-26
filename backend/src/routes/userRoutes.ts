import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { updateProfileValidation } from "../middlewares/userValidations";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();
const userController = new UserController();

// All routes here require authentication
router.use(authenticateJWT);

router.get("/me", userController.getProfile);
router.put("/me", updateProfileValidation,validateRequest, userController.updateProfile);

router.get("/", userController.listUsers);

export default router;
