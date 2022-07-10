import Api from "global/Api";
import { ID } from "types/common";
import { JobFormRequest, JobQueryType } from "types/models/job";

const createJob = (data: JobFormRequest) => {
    return Api.post('admin/jobs/', null, data);
}
const updateJob = (id: ID, data: JobFormRequest) => {
    return Api.put(`admin/jobs/${id}`, null, data);
}
const getJobs = (query: JobQueryType) => {
    return Api.get('admin/jobs', null, query);
}
const retrieveJob = (id: ID) => {
    return Api.get(`admin/jobs/${id}`);
}

const adminJobApi = {
    getJobs,
    retrieveJob,
    createJob,
    updateJob
}
export default adminJobApi;