import { User, UserRole } from "../models/User";

export class UserResponseDTO {
    id!: string;
    name!: string;
    email!: string;
    role!: UserRole;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}