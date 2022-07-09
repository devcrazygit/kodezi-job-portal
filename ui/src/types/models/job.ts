import { Pager } from "types/common";
import { AppliationResponseType } from "types/models/application";

export type JobDataType = {
    title: string;
    description: string;
}
export type JobItemType = {
    id: string;
    authorName?: string;
    createDate: string;
    updateDate: string;
} & JobDataType;

export type JobDetailForUser = {
    job: JobItemType,
    application: AppliationResponseType
}

export type JobQueryType = Pager;