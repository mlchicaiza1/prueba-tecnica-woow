import { AppDataSource } from "../config/database";
import { User, UserRole } from "../models/User";
import { IUserRepository } from "../interfaces/IUserRepository";
import { injectable } from "tsyringe";
import { Repository } from "typeorm";

@injectable()
export class UserRepository implements IUserRepository {

  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.repository.find({
      select: ["id", "name", "email", "role", "createdAt", "updatedAt"]
    });
  }
  async findUserById(id: string): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }
  async findUserByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }
  async createUser(data: Partial<User>): Promise<User> {
    const userRole = data.role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.USER;
    const user = this.repository.create({ ...data, role: userRole });
    return await this.repository.save(user);
  }
  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    const user = await this.findUserById(id);
    if (!user) return null;
    await this.repository.update(id, data);
    return await this.findUserById(id);
  }
}







