import { AppDataSource } from "../config/database";
import { User, UserRole } from "../models/User";

export const userRepository = AppDataSource.getRepository(User);


export const findAllUsers = async (): Promise<User[]> => {
  return userRepository.find({
    select: ["id", "name", "email", "role", "createdAt", "updatedAt"]
  });
};

export const findUserById = async (id: string): Promise<User | null> => {
  return userRepository.findOne({ where: { id } });
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const userRole = userData.role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.USER;
  const user = userRepository.create({ ...userData, role: userRole });
  return userRepository.save(user);
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User | null> => {
  const user = await findUserById(id);
  if (!user) return null;
  return userRepository.save({ ...user, ...userData });
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return userRepository.findOne({ where: { email } });
};





