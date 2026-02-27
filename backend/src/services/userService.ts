import { UserResponseDTO } from "../dtos/userResponseDto";
import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository";
import { UpdateUserDTO } from "../dtos/UpdateUserDto";
import bcrypt from "bcryptjs";
import { IFilterUser } from "../interfaces/IFilterUser";
import { IPaginatedResult } from "../interfaces/IPaginatedResult";
@injectable()
export class UserService {

  constructor(@inject("UserRepository") private userRepository: IUserRepository) {}

  async getProfile(userId: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) throw new Error("User not found");
    return new UserResponseDTO(user);
  }

  async updateProfile(userId: string, data: UpdateUserDTO): Promise<UserResponseDTO> {
    if(data.password){
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }
    const user = await this.userRepository.updateUser(userId, data);
    if (!user) throw new Error("User not found");
    return new UserResponseDTO(user);
  }

  async listUsers(page: number = 1, limit: number = 10, 
    filters?: Omit<IFilterUser, 'skip' | 'take'>): Promise<IPaginatedResult<UserResponseDTO>> {
    const skip = (page - 1) * limit;
    const [users, total] = await this.userRepository.findAllUsers({ skip, take: limit, ...filters });
    return {
      data: users.map(user => new UserResponseDTO(user)),
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }
}
