import Api from "global/Api";
import { ID } from "types/common";
import { ApplicationQueryType } from "types/models/application";

const get = (jobId:ID,  query: ApplicationQueryType) => {
    return Api.get(`admin/jobs/${jobId}/applications`, null, query);
}
const retrieve = (jobId: ID, applicationId: ID) => {
    return Api.get(`admin/jobs/${jobId}/applications/${applicationId}`);
}
const applicationAdminApi = {
    get,
    retrieve
}
export default applicationAdminApi;