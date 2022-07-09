import Api from "global/Api";
import { ID } from "types/common";
import { JobQueryType } from "types/models/job";

const getJobs = (query: JobQueryType) => {
    return Api.get('admin/jobs', null, query);
}
const retrieveJob = (id: ID) => {
    return Api.get(`admin/jobs/${id}`);
}
const adminJobApi = {
    getJobs,
    retrieveJob,
}
export default adminJobApi;