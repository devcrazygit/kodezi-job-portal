import { Application, Resubmission } from "../../model/Application.model";
import { PagerQueryType } from "./common";

export interface ApplicationRequest {
    phone: string;
    coverletter?: string;
}

export interface ApplicationResponse {
    id: string,
    jobId: string,
    userId: string,
    phone: string,
    coverletter: string,
    resume: string,
    resubmission: Resubmission
}

export interface ApplicationQuery extends PagerQueryType {}

export const application2Response = (data: Application): ApplicationResponse => ({
    id: data._id,
    jobId: data.job._id,
    userId: data.user._id,
    phone: data.phone,
    coverletter: data.coverletter,
    resume: data.resume,
    resubmission: data.resubmission
})
