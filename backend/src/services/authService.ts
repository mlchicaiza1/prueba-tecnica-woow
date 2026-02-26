import { findUserByEmail, createUser } from "../repositories/userRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RegisterRequestDto, LoginRequestDto, AuthResponseDto } from "../dtos/authDto";
import { UserResponseDto } from "../dtos/userDto";

export class AuthService {

  async register(data: RegisterRequestDto): Promise<UserResponseDto> {
    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
      throw new Error("Email is already registered");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(data: LoginRequestDto): Promise<AuthResponseDto> {
    const user = await findUserByEmail(data.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret_jwt_key_woow",
      { expiresIn: "1d" }
    );

    const { password, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }
}
