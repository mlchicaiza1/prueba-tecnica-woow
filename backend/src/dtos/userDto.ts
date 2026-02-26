import { UserRole } from "../models/User";

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserRequestDto {
  name?: string;
}

export interface ListUsersResponseDto {
  users: UserResponseDto[];
}
