import { Job } from "../../model/Job.model";
import { dataToPagerResponse, PagerQueryType, PagerResponseType } from "./common";

export interface JobRequest {
    title: string;
    description: string;
}

export interface JobQuery extends PagerQueryType {
    search?: string
}

export interface JobResponse {
    id?: string,
    title: string,
    userId?: string,
    description: string,
    createDate: string,
    updateDate: string,
    authorName?: string
}
export const job2Response = (job: Job) => ({
    id: job._id,
    title: job.title,
    userId: job.user?._id,
    description: job.description,
    createDate: job.createDate,
    updateDate: job.updateDate,
    authorName: job.user ? job.user.name : null
})

export const convertPagerJobs2Response = (data): PagerResponseType<JobResponse> => {
    let result = dataToPagerResponse<Job>(data);
    console.log({data, result})
    return {
        docs: result.docs ? result.docs.map(item => job2Response(item)) : [],
        ...result
    };
}