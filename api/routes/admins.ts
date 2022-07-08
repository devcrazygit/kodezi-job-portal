import { Route } from ".";
import { JobController } from "../controller/admin/job.controller";
import { jobCreateRequest, jobQueryRequest, jobUpdateRequest } from "../lib/validation/jobs";
import { authorize } from "../middleware/authorize";
import validate from "../middleware/validate";
import { Role } from "../model/User.model";

const jobController = new JobController

const routes: Route[] = [
    {
        name: 'job create',
        method: 'post',
        path: '/api/jobs',
        middleware: [validate(jobCreateRequest)],
        handler: jobController.create
    },
    {
        name: 'job list',
        method: 'get',
        path: '/api/jobs',
        middleware: [validate(jobQueryRequest)],
        handler: jobController.get
    },
    {
        name: 'job update',
        method: 'put',
        path: '/api/jobs/:id',
        middleware: [validate(jobUpdateRequest)],
        handler: jobController.update
    },
    {
        name: 'job retrieve',
        method: 'get',
        path: '/api/jobs/:id',
        middleware: [validate(jobUpdateRequest)],
        handler: jobController.update
    },
]
export default routes.map(route => {
    if (route.middleware) {
        route.middleware.push(authorize([Role.ADMIN]));
    }
    return route;
})