import { Pager } from "types/common";
import { ApplicationResponseType } from "types/models/application";

export type JobDataType = {
    title: string;
    description: string;
}
export type JobFormRequest = JobDataType;
export type JobItemType = {
    id: string;
    authorName?: string;
    createDate: string;
    updateDate: string;
} & JobDataType;

export type JobDetailForUser = {
    job: JobItemType,
    application: ApplicationResponseType
}

export type JobQueryType = Pager;