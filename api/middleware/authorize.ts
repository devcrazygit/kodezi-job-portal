import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../lib/helpers/env";
import { AuthRequest } from "../lib/types/users";
import { Role, User, UserModel } from "../model/User.model";

export const authorize = (roles: Role[]) => async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    
        if (token.toLowerCase().startsWith('bearer')) {
            token = token.slice('bearer'.length).trim();
        }
        const { id } = verify(token, env('JWT_SECRET')) as User;
        const user = await UserModel.findById(id);
        if (!user || !roles.includes(user.role)) {
            return res.status(403).json('You are not allowed');
        }
        req.user = user;
        next();

    } catch(error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Expired token' });
            return;
        }
        res.status(500).json({ message: 'Failed to authenticate user' });
    }

}