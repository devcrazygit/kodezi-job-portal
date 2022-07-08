import { Request } from "express";
import { FilterQuery } from "mongoose";
import { ControllerError } from "../../lib/exceptions/controller_exception";
import { sanitizePager, searchRegex } from "../../lib/helpers/utils";
import { PagerResponseType } from "../../lib/types/common";
import { convertPagerJobs2Response, job2Response, JobQuery, JobRequest } from "../../lib/types/jobs";
import { AuthRequest } from "../../lib/types/users";
import { Job, JobModel } from "../../model/Job.model";
import { UserModel } from "../../model/User.model";

export class JobController {
    constructor() {}
    async create(req: AuthRequest) {
        const data = req.body as JobRequest;
        const currentUser = req.user;
        const job = await JobModel.create({ ...data, user: currentUser._id });
        currentUser.jobs.push(job);
        await currentUser.save();
        return job2Response(job);
    }
    async update(req: AuthRequest) {
        const id = req.params.id;
        const data = req.body as JobRequest;
        const currentUser = req.user;
        const job = await JobModel.findOneAndUpdate({ _id: id, user: currentUser._id }, {data, user: currentUser._id});
        return job2Response(job);
    }
    async get(req: AuthRequest) {
        const queryData = req.query as JobQuery;
        const { search } = queryData;
        const { page, size: limit } = sanitizePager(req.query);
        const currentUser = req.user;
        
        let query: FilterQuery<Job> = {};
        if (search) { 
            const searchPattern = searchRegex(search);
            query = {
                $or: [
                    { title: { $regex:  searchPattern, $options: 'i' }}
                ]
            }
        }
        await currentUser.populate([
            {
                path: 'jobs',
                options: {
                    skip: limit * (page - 1),
                    limit
                },
                match: query
            }
        ])
        .execPopulate()
        
        // return convertPagerJobs2Response(currentUser.jobs as PagerResponseType<Job>);
        return currentUser
    }
    async retrieve(req: AuthRequest) {
        const id = req.params.id;
        const currentUser = req.user;
        const job = await (await (await JobModel.findById(id)).populated('user'));
        if (!job || job.user._id !== currentUser._id) {
            throw new ControllerError('No such a job', 404)
        }
        return job2Response(job);
    }
}