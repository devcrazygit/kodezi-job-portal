import { Route } from ".";
import { ApplicationController } from "../controller/admin/application.controller";
import { JobController } from "../controller/admin/job.controller";
import { applicationAdminQuery } from "../lib/validation/applications";
import { jobCreateRequest, jobQueryRequest, jobRetrieveRequest, jobUpdateRequest } from "../lib/validation/jobs";
import { authorize } from "../middleware/authorize";
import validate from "../middleware/validate";
import { Role } from "../model/User.model";

export const jobController = new JobController
export const applicationController = new ApplicationController;

const routes: Route[] = [
    {
        name: 'job create',
        method: 'post',
        path: '/api/admin/jobs',
        middleware: [validate(jobCreateRequest)],
        handler: jobController.create
    },
    {
        name: 'job list',
        method: 'get',
        path: '/api/admin/jobs',
        middleware: [validate(jobQueryRequest)],
        handler: jobController.get
    },
    {
        name: 'job update',
        method: 'put',
        path: '/api/admin/jobs/:id',
        middleware: [validate(jobUpdateRequest)],
        handler: jobController.update
    },
    {
        name: 'job retrieve',
        method: 'get',
        path: '/api/admin/jobs/:id',
        middleware: [validate(jobRetrieveRequest)],
        handler: jobController.retrieve
    },
    {
        name: 'application list',
        method: 'get',
        path: '/api/admin/jobs/:id/applications',
        middleware: [validate(applicationAdminQuery)],
        handler: applicationController.get
    }
]
export default routes.map(route => {
    if (route.middleware) {
        route.middleware.push(authorize([Role.ADMIN]));
    }
    return route;
})