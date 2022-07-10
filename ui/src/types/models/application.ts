import { ID, Pager } from "types/common";
import { UserDataType } from "types/models/user";

export enum Resubmission {
    NONE = 0,
    COVERLETTER = 1,
    RESUME = 2
}
export type ApplicationQueryType = Pager;

export type ApplicationDataType = {
    id?: string,
    jobId: string,
    user?: string,
    phone: string,
    coverletter: string,
    resume: string,
    author?: UserDataType
}
export type ApplicationRequest = {
    phone: string,
    coverletter: string,
    resume: any
}
export type AppliationResponseType = {
    id: ID,
    resubmission: Resubmission
} & ApplicationDataType;