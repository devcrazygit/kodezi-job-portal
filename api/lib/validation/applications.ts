import { Request } from "express";
import { UploadedFile } from "express-fileupload";
import { body, Schema } from "express-validator";
import { ApplicationStatus } from "../../model/Application.model";
import { PageQuery, retrieveQuery } from "./common";
import { jobRetrieveRequest } from "./jobs";


export const applicationQuery: Schema = {
    ...PageQuery,
}
export const applicationAdminQuery: Schema = {
    ...applicationQuery,
    ...retrieveQuery
}
export const applyRequest: Schema = {
    phone: {
        in: ['body'],
        isMobilePhone: true
    },
    resume: {
        custom: {
            options: (value, { req }) => {
                if (!req.files.resume) return false;
                const resume = req.files.resume as UploadedFile;
                return [
                    'application/pdf', 
                    'application/msword', 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                ].includes(resume.mimetype);
            }
        }
    },
    coverletter: {
        in: ['body'],
        optional: { options: { nullable: true }},
    },
    ...retrieveQuery
}

export const applicationRetrieveQuery: Schema = {
    ...retrieveQuery
}

export const applicationUpdateRequest: Schema = {
    ...retrieveQuery,
    status: {
        in: ['body'],
        custom: {
            options: (value) => {
                return [ApplicationStatus.ACCEPTED, ApplicationStatus.REJECTED, ApplicationStatus.SUBMITTED, ApplicationStatus.RESUBMISSION].includes(value);
            }
        }
    },
    resubmission: {
        in: ['body'],
        custom: {
            options: (value, { req }) => {
                if (req.body.status === ApplicationStatus.RESUBMISSION && !value) return false;
                return true;
            }
        }
    }
}

export const applyUpdateRequest: Schema = {
    resume: {
        custom: {
            options: (value, { req }) => {
                if (!req.files.resume) return true;
                const resume = req.files.resume as UploadedFile;
                return [
                    'application/pdf', 
                    'application/msword', 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                ].includes(resume.mimetype);
            }
        }
    },
    coverletter: {
        in: ['body'],
        optional: { options: { nullable: true }},
    },
    ...jobRetrieveRequest
}