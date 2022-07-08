import { Request } from "express";
import { UploadedFile } from "express-fileupload";
import { ControllerError } from "../lib/exceptions/controller_exception";
import { randomKey, sanitizePager, toObjectId } from "../lib/helpers/utils";
import { application2Response, ApplicationQuery, ApplicationRequest } from "../lib/types/applications";
import { AuthRequest } from "../lib/types/users";
import { ApplicationModel } from "../model/Application.model";
import { JobModel } from "../model/Job.model";
import { AWSService } from "../services/aws";
import { readFileSync } from 'fs';
export class ApplicationController {
    constructor() {}

    async apply(req: AuthRequest) {
        const data = req.body as ApplicationRequest;
        const jobId = req.params.jobId;
        const job = await JobModel.findById(jobId);
        const currentUser = req.user;

        const existing = await ApplicationModel.findOne({ job, user: currentUser });
        if (existing) {
            throw new ControllerError('You have already applied', 404);
        }

        const service = AWSService.getInstance();
        const resumeFile = req.files.resume as UploadedFile
        const ext = resumeFile.name.split('.').pop();
        const uploaded = await service.upload(resumeFile.data, randomKey() + '.' + ext);
        
        const application = await ApplicationModel.create({
            job,
            user: currentUser,
            resume: uploaded.Location,
            ...data
        });
        return application2Response(application);
    }
    async get(req: AuthRequest) {
        const { page, size } = sanitizePager(req.query as ApplicationQuery);
        
        const currentUser = req.user;
        await currentUser.populate([
            {
                path: 'applications',
                options: {
                    skip: size * (page - 1),
                    limit: size
                },
            }
        ])
    }
}