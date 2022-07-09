import { compareSync } from 'bcrypt';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import { ControllerError } from '../lib/exceptions/controller_exception';
import { env } from '../lib/helpers/env';
import { APILogger } from '../lib/logger/api.logger';
import { AuthRequest, user2Response, UserLoginRequest, UserRegisterRequest } from '../lib/types/users';
import { Role, UserModel } from '../model/User.model';

export class UserController {
    
    constructor() { }
    async register(req: Request) {
        const data = req.body as UserRegisterRequest;
        const existUser = await UserModel.findOne({ email: data.email });
        if (existUser) {
            console.error('Email is already taken');
            throw new ControllerError('Email is already taken', 404);
        }
        const user = await UserModel.create({...data, role: Role.USER });
        return user2Response(user);
    }

    async login(req: Request) {
        const data = req.body as UserLoginRequest;
        const { email, password } = data;

        const user = await UserModel.findOne({ email });
        if (!user) {
            console.error('No such user');
            throw new ControllerError('No such user', 404);
        }
        if (!compareSync(password, user.password)) {
            throw new ControllerError('Incorrect password', 404);
        }
        const token = sign({id: user._id}, env('JWT_SECRET'), { expiresIn: '24h'});
        return { user: user2Response(user), token }
    }
    async me(req: AuthRequest) {
        const user = req.user;
        return user2Response(user);
    }
}
