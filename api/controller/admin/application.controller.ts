import { Request } from "express";
import { ControllerError } from "../../lib/exceptions/controller_exception";
import { sanitizePager } from "../../lib/helpers/utils";
import { application2Response, ApplicationQuery } from "../../lib/types/applications";
import { AuthRequest, user2Response } from "../../lib/types/users";
import { ApplicationModel } from "../../model/Application.model";
import { JobModel } from "../../model/Job.model";

export class ApplicationController {
    constructor() {}
    
    async get(req: AuthRequest) {
        const id = req.query.id;
        const queryData = req.query as ApplicationQuery;
        const { page, size } = sanitizePager(queryData);
        const currentUser = req.user;

        const job = await JobModel.findById(id);
        await job.populate('user').execPopulate();
        if (!job || !job.user._id.equals(currentUser._id)) {
            throw new ControllerError('No such a job', 404)
        }

        const applications = await ApplicationModel.find().populate('user').skip(size * (page - 1)).limit(size);
        console.log({applications});

        return applications.map(item => ({...application2Response(item), author: user2Response(item.user)}))
    }

}