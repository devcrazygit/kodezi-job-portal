import { Request } from "express";
import { UploadedFile } from "express-fileupload";
import { body, Schema } from "express-validator";
import { PageQuery } from "./common";
import { jobRetrieveRequest } from "./jobs";


export const applicationQuery: Schema = {
    ...PageQuery,
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
    ...jobRetrieveRequest
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