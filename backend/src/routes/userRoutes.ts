import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { updateProfileValidation } from "../middlewares/userValidations";

const router = Router();
const userController = new UserController();

// All routes here require authentication
router.use(authenticateJWT);

router.get("/me", userController.getProfile);
router.put("/me", updateProfileValidation, userController.updateProfile);

router.get("/", userController.listUsers);

export default router;
