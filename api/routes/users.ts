import { Route } from ".";
import { ApplicationController } from "../controller/application.controller";
import { JobController } from "../controller/job.controller";
import { UserController } from "../controller/user.controller"
import { applyRequest, applyUpdateRequest } from "../lib/validation/applications";
import { jobQueryRequest, jobRetrieveRequest } from "../lib/validation/jobs";
import { userLoginRequest, userRegisterRequest } from "../lib/validation/users"
import { authorize } from "../middleware/authorize";
import validate from "../middleware/validate"
import { Role } from "../model/User.model";

export const userController = new UserController;
export const applicationController = new ApplicationController;
export const jobController = new JobController;

const routes: Route[] = [
    {
        name: 'user register',
        method: 'post',
        path: '/api/register',
        middleware: [validate(userRegisterRequest)],
        handler: userController.register
    },
    {
        name: 'user login',
        method: 'post',
        path: '/api/login',
        middleware: [validate(userLoginRequest)],
        handler: userController.login
    },
    {
        name: 'get me',
        method: 'get',
        path: '/api/users/me',
        middleware: [authorize([Role.USER, Role.ADMIN])],
        handler: userController.me
    },
    // jobs
    {
        name: 'get jobs',
        method: 'get',
        path: '/api/jobs',
        middleware: [validate(jobQueryRequest), authorize([Role.USER])],
        handler: jobController.get
    },
    {
        name: 'retrieve job',
        method: 'get',
        path: '/api/jobs/:jobId',
        middleware: [validate(jobRetrieveRequest), authorize([Role.USER])],
        handler: jobController.retrieve
    },
    // applications
    {
        name: 'apply to job',
        method: 'post',
        path: '/api/apply/jobs/:jobId',
        middleware: [validate(applyRequest), authorize([Role.USER])],
        handler: applicationController.apply
    },
    {
        name: 'update appliation',
        method: 'post',
        path: '/api/application/:applicationId',
        middleware: [validate(applyUpdateRequest), authorize([Role.USER])],
        handler: applicationController.update
    }
]
export default routes;