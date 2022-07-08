import { Request } from "express";
import { FilterQuery } from "mongoose";
import { ControllerError } from "../lib/exceptions/controller_exception";
import { sanitizePager, searchRegex } from "../lib/helpers/utils";
import { job2Response, JobQuery } from "../lib/types/jobs";
import { Job, JobModel } from "../model/Job.model";

export class JobController {
    constructor() {}

    async get(req: Request) {
        const queryData = req.query as JobQuery;
        const { search } = queryData;
        const { page, size: limit } = sanitizePager(req.query);

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
        const jobs = await JobModel.find(query).skip(limit * (page - 1)).limit(limit)
        
        return jobs.map(job => job2Response(job));
    }
    async retrieve(req: Request) {
        const id = req.params.id;
        const job = await JobModel.findById(id);
        if (!job) throw new ControllerError('No such a job', 400)
        return job2Response(job);
    }

}