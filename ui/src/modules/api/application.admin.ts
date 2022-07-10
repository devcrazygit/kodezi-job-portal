import Api from "global/Api";
import { ID } from "types/common";
import { ApplicationQueryType } from "types/models/application";

const get = (jobId:ID,  query: ApplicationQueryType) => {
    return Api.get(`admin/jobs/${jobId}/applications`, null, query);
}
const retrieve = (applicationId: ID) => {
    return Api.get(`admin/applications/${applicationId}`);
}
const applicationAdminApi = {
    get,
    retrieve
}
export default applicationAdminApi;