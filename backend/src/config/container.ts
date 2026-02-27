import { container } from "tsyringe";
import { UserRepository } from "../repositories/userRepository";
import { AuthService } from "../services/authService";
import { UserService } from "../services/userService";

// Register Repositories
container.register("UserRepository", {
  useClass: UserRepository,
});

// Register Services
container.register("AuthService", {
  useClass: AuthService,
});

container.register("UserService", {
  useClass: UserService,
});
