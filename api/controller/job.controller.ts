import { Request } from "express";
import { FilterQuery } from "mongoose";
import { ControllerError } from "../lib/exceptions/controller_exception";
import { sanitizePager, searchRegex } from "../lib/helpers/utils";
import { application2Response } from "../lib/types/applications";
import { job2Response, JobQuery } from "../lib/types/jobs";
import { AuthRequest } from "../lib/types/users";
import { ApplicationModel } from "../model/Application.model";
import { Job, JobModel } from "../model/Job.model";

export class JobController {
    constructor() {}

    async get(req: Request) {
        const queryData = req.query as JobQuery;
        const { search } = queryData;
        const {page, size} = sanitizePager(queryData);

        let query: FilterQuery<Job> = {};
        if (search) { 
            const searchPattern = searchRegex(search);
            query = {
                $or: [
                    { title: { $regex:  searchPattern, $options: 'i' }},
                    { description: { $regex:  searchPattern, $options: 'i' }}
                ]
            }
        }
        const jobs = await JobModel.find(query)
            .populate('user', ['name'])
            .skip(size * (page - 1)).limit(size);
        
        return jobs.map(job => job2Response(job));
    }
    async retrieve(req: AuthRequest) {
        const id = req.params.id;
        const job = await JobModel.findById(id);
        const user = req.user;
        if (!job) throw new ControllerError('No such a job', 400)
        const application = await ApplicationModel.findOne({ user, job})
        return {
            application: application ? application2Response(application) : null,
            job: job2Response(job)
        }
    }

}