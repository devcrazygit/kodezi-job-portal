import { Request } from "express";
import { UploadedFile } from "express-fileupload";
import { ControllerError } from "../lib/exceptions/controller_exception";
import { randomKey, sanitizePager, toObjectId } from "../lib/helpers/utils";
import { application2Response, ApplicationQuery, ApplicationRequest } from "../lib/types/applications";
import { AuthRequest } from "../lib/types/users";
import { ApplicationModel, ApplicationStatus, Resubmission } from "../model/Application.model";
import { JobModel } from "../model/Job.model";
import { AWSService } from "../services/aws";
import { readFileSync } from 'fs';
export class ApplicationController {
    constructor() {}

    async apply(req: AuthRequest) {
        const data = req.body as ApplicationRequest;
        const jobId = req.params.id;
        const job = await JobModel.findById(jobId);
        if (!job) {
            throw new ControllerError('No such a job', 404);
        }
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
            ...data,
            resubmission: Resubmission.NONE,
            status: ApplicationStatus.SUBMITTED
        });
        return application2Response(application);
    }
    async update(req: AuthRequest) {
        const currentUser = req.user;
        const data = req.body as ApplicationRequest;
        const applicationId = req.params.applicationId;
        const application = await ApplicationModel.findById(applicationId);
        if (!application || application.user._id.equals(currentUser._id)) {
            throw new ControllerError('No such a application', 404);
        }
        if (application.resubmission === Resubmission.NONE) {
            throw new ControllerError('No update request')
        }
        
        if (application.resubmission === Resubmission.COVERLETTER) {
            if (data.coverletter === application.coverletter) {
                throw new ControllerError('No changes in coverletter');
            }
            application.coverletter = data.coverletter;
        }

        if (application.resubmission === Resubmission.RESUME) {
            if (!req.files.resume) throw new ControllerError('Please update resume');
            const service = AWSService.getInstance();
            const resumeFile = req.files.resume as UploadedFile
            const ext = resumeFile.name.split('.').pop();
            const uploaded = await service.upload(resumeFile.data, randomKey() + '.' + ext);
            application.resume = uploaded.Location;
        }
        application.resubmission = Resubmission.NONE;
        await application.save();
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
        .execPopulate();
        return currentUser.applications.map(item => application2Response(item));
    }
}