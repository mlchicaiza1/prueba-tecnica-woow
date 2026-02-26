import { findAllUsers, findUserById, updateUser } from "../repositories/userRepository";
import { UserResponseDto, UpdateUserRequestDto } from "../dtos/userDto";

export class UserService {

  async getProfile(userId: string): Promise<UserResponseDto> {
    const user = await findUserById(userId);
    if (!user) throw new Error("User not found");
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateProfile(userId: string, data: UpdateUserRequestDto): Promise<UserResponseDto> {
    const user = await updateUser(userId, data);
    if (!user) throw new Error("User not found");
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async listUsers(): Promise<UserResponseDto[]> {
    const users = await findAllUsers();
    return users;
  }
}
