import { ID, Pager } from "types/common";
import { UserDataType } from "types/models/user";

export enum Resubmission {
    NONE = 0,
    COVERLETTER = 1,
    RESUME = 2
}
export enum ApplicationStatus {
    SUBMITTED = 0,
    ACCEPTED = 1,
    REJECTED = 2,
    RESUBMISSION = 3
}
export type ApplicationQueryType = Pager;

export interface ApplicationUpdateRequest {
    status: ApplicationStatus,
    resubmission: Resubmission,
}

export type ApplicationDataType = {
    id?: string,
    jobId: string,
    user?: string,
    phone: string,
    coverletter: string,
    resume: string,
    author?: UserDataType,
    resubmission: Resubmission,
    status: ApplicationStatus
}
export type ApplicationRequest = {
    phone: string,
    coverletter: string,
    resume: any
}

export type ApplicationDataUpdateRequest = {
    coverletter?: string,
    resume?: any
}

export type ApplicationResponseType = {
    id: ID,
} & ApplicationDataType;