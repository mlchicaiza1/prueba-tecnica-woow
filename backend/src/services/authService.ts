import bcrypt from "bcryptjs";
import { AuthResponseDTO, LoginUserDTO } from "../dtos/authDto";
import { UserResponseDTO } from "../dtos/userResponseDto";
import { generateToken } from "../config/jwt";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository";
import { CreateUserDTO } from "../dtos/CreateUserDto";

@injectable()
export class AuthService {

  constructor( @inject("UserRepository") private userRepository: IUserRepository) {}

  async register(data: CreateUserDTO): Promise<UserResponseDTO> {
    const existingUser = await this.userRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error("Email is already registered");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.createUser({
      ...data,
      password: hashedPassword,
    });
    return new UserResponseDTO(user);
  }

  async login(data: LoginUserDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.findUserByEmail(data.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user.id, user.email, user.role);
    return { token, user: new UserResponseDTO(user) };
  }
}
