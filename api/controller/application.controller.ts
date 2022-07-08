import { Request } from "express";
import { UploadedFile } from "express-fileupload";
import { ControllerError } from "../lib/exceptions/controller_exception";
import { randomKey, toObjectId } from "../lib/helpers/utils";
import { application2Response, ApplicationRequest } from "../lib/types/applications";
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

        const path = (req.files.resume as UploadedFile).tempFilePath;
        console.log('uploaded temp file path: ' + path);
        const blob = readFileSync(path);

        const service = AWSService.getInstance();
        const uploaded = await service.upload(blob, randomKey());
        const resume = uploaded.Location
        
        const application = await ApplicationModel.create({
            job,
            user: currentUser,
            resume,
            ...data
        });
        return application2Response(application);
    }
}