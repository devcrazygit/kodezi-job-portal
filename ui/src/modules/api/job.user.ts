import Api from "global/Api";
import { ID } from "types/common";
import { ApplicationDataUpdateRequest } from "types/models/application";
import { JobQueryType } from "types/models/job";

const getJobs = (query: JobQueryType) => {
    return Api.get('jobs', null, query);
}
const retrieveJob = (id: ID) => {
    return Api.get(`jobs/${id}`);
}
const applyJob = (id: ID, data: ApplicationDataUpdateRequest) => {
    const formData = new FormData();
    formData.append('phone', data.phone);
    formData.append('coverletter', data.coverletter);
    if (data.resume && data.resume instanceof File) {
        formData.append('resume', data.resume);
    }
    return Api.post(
        `apply/jobs/${id}`, 
        { 'Content-Type': 'multipart/form-data' },
        formData
    );
}
// const updateApplication = (id: ID, data)
const userJobApi = {
    getJobs,
    retrieveJob,
    applyJob
}
export default userJobApi;