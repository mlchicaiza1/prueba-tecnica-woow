import { findAllUsers, findUserById, updateUser } from "../repositories/userRepository";

export class UserService {

  async getProfile(userId: string) {
    const user = await findUserById(userId);
    if (!user) throw new Error("User not found");
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateProfile(userId: string, data: { name?: string }) {
    const user = await updateUser(userId, data);
    if (!user) throw new Error("User not found");
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async listUsers() {
    const users = await findAllUsers();
    return users;
  }
}
