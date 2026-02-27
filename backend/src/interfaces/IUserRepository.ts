import { User } from "../models/User";
import { IFilterUser } from "./IFilterUser";

export interface IUserRepository {
  findAllUsers(options?: IFilterUser): Promise<[User[], number]>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  createUser(data: Partial<User>): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User | null>;
}