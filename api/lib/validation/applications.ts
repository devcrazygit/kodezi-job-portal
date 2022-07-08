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
                console.log(req.files);
                if (!req.files.resume) return false;
                const resume = req.files.resume as UploadedFile;
                return ['application/pdf', 'application/msword', 'application/docx'].includes(resume.mimetype);
            }
        }
    },
    coverletter: {
        in: ['body'],
        optional: { options: { nullable: true }},
    },
    ...jobRetrieveRequest
}