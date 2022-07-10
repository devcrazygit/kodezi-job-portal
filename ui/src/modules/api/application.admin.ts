import Api from "global/Api";
import { ID } from "types/common";
import { ApplicationQueryType, ApplicationUpdateRequest } from "types/models/application";

const get = (jobId:ID,  query: ApplicationQueryType) => {
    return Api.get(`admin/jobs/${jobId}/applications`, null, query);
}
const retrieve = (applicationId: ID) => {
    return Api.get(`admin/applications/${applicationId}`);
}
const update = (applicationId: ID, data: ApplicationUpdateRequest) => {
    return Api.put(`admin/applications/${applicationId}`, null, data);
}
const applicationAdminApi = {
    get,
    retrieve,
    update
}
export default applicationAdminApi;