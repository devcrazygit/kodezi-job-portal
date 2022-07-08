import { Request } from "express";
import { Role, User } from "../../model/User.model";

export interface AuthRequest extends Request{
    user: User
}

export interface UserRegisterRequest {
    name: string;
    email: string;
    password: string;
}
export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserResponse {
    id: string,
    role: Role,
    name: string,
    email: string,
    createdDate: string,
    updatedDate: string
}
export const user2Response = (user: User) => ({
    id: user._id, 
    name: user.name, 
    email: user.email,
    role: user.role,
    createdDate: user.createDate,
    updatedDate: user.updateDate
})