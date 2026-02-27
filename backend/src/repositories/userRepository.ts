import { AppDataSource } from "../config/database";
import { User, UserRole } from "../models/User";
import { IUserRepository } from "../interfaces/IUserRepository";
import { injectable } from "tsyringe";
import { Repository, ILike, FindOptionsWhere } from "typeorm";
import { IFilterUser } from "../interfaces/IFilterUser";

@injectable()
export class UserRepository implements IUserRepository {

  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findAllUsers(options?: IFilterUser): Promise<[User[], number]> {
    const where: FindOptionsWhere<User> = {};
    if (options?.name) where.name = ILike(`%${options.name}%`);
    if (options?.email) where.email = ILike(`%${options.email}%`);
    if (options?.role) where.role = options.role as UserRole;

    return await this.repository.findAndCount({
      select: ["id", "name", "email", "role", "createdAt", "updatedAt"],
      where,
      skip: options?.skip || 0,
      take: options?.take || 10,
      order: { createdAt: "DESC" }
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







