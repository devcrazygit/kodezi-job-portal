import { Route } from ".";
import { UserController } from "../controller/user.controller"
import { userLoginRequest, userRegisterRequest } from "../lib/validation/users"
import { authorize } from "../middleware/authorize";
import validate from "../middleware/validate"
import { Role } from "../model/User.model";

export const userController = new UserController;

const routes: Route[] = [
    {
        name: 'user register',
        method: 'post',
        path: '/api/users/register',
        middleware: [validate(userRegisterRequest)],
        handler: userController.register
    },
    {
        name: 'user login',
        method: 'post',
        path: '/api/users/login',
        middleware: [validate(userLoginRequest)],
        handler: userController.login
    },
    {
        name: 'get me',
        method: 'get',
        path: '/api/users/me',
        middleware: [authorize([Role.USER, Role.ADMIN])],
        handler: userController.me
    }
]
export default routes;