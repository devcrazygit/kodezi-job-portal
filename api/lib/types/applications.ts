import { Application, Resubmission } from "../../model/Application.model";

export interface ApplicationRequest {
    phone: string;
    coverletter?: string;
}

export interface ApplicationResponse {
    jobId: string,
    userId: string,
    phone: string,
    coverletter: string,
    resume: string,
    resubmission: Resubmission
}

export const application2Response = (data: Application): ApplicationResponse => ({
    jobId: data.job._id,
    userId: data.user._id,
    phone: data.phone,
    coverletter: data.coverletter,
    resume: data.resume,
    resubmission: data.resubmission
})
