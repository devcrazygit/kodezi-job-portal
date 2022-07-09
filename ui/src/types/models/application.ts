import { ID } from "types/common";

export enum Resubmission {
    NONE = 0,
    COVERLETTER = 1,
    RESUME = 2
}

export type AppliationDataType = {
    jobId: string,
    userId: string,
    phone: string,
    coverletter: string,
    resume: string,
}
export type ApplicationRequest = {
    phone: string,
    coverletter: string,
    resume: any
}
export type AppliationResponseType = {
    id: ID,
    resubmission: Resubmission
} & AppliationDataType;