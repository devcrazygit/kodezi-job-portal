import { Request } from "express";
import { ControllerError } from "../../lib/exceptions/controller_exception";
import { sanitizePager } from "../../lib/helpers/utils";
import { application2Response, ApplicationQuery } from "../../lib/types/applications";
import { job2Response } from "../../lib/types/jobs";
import { AuthRequest, user2Response } from "../../lib/types/users";
import { ApplicationModel } from "../../model/Application.model";
import { JobModel } from "../../model/Job.model";

export class ApplicationController {
    constructor() {}
    
    async get(req: AuthRequest) {
        const id = req.params.id;
        const queryData = req.query as ApplicationQuery;
        const { page, size } = sanitizePager(queryData);
        const currentUser = req.user;

        const job = await JobModel.findById(id);
        await job.populate('user').execPopulate();
        if (!job || !job.user._id.equals(currentUser._id)) {
            throw new ControllerError('No such a job', 404)
        }

        console.log({job})

        const applications = await ApplicationModel.find({ job }).populate('user').skip(size * (page - 1)).limit(size);
        return applications.map(item => ({...application2Response(item), author: user2Response(item.user)}))
    }

    async retrieve(req: AuthRequest) {
        const id = req.params.id;
        const currentUser = req.user;
        const application = await ApplicationModel.findById(id).populate({ path: 'job', populate: { path: 'user' } });
        if (!application || !application.job.user._id.equals(currentUser._id)) {
            throw new ControllerError('No such application');
        }
        await application.populate('user').execPopulate();

        return {
            application: {...application2Response(application), author: user2Response(application.user)},
            job: job2Response(application.job)
        };
    }
}