import { Card, CardContent, Typography } from "@mui/material";
import useApi from "hooks/useApi";
import userJobApi from "modules/api/job.user";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ParamType } from "types/common";
import { ApplicationResponseType } from "types/models/application";
import { JobDetailForUser, JobItemType } from "types/models/job";
import JobApplyForm from "views/pages/user/components/JobApplyForm";

const JobDetail = () => {
    const { id } = useParams<ParamType>();
    const [initial, setInitial] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<JobItemType>();
    const [application, setApplication] = useState<ApplicationResponseType>();

    const { apiErrorHandler } = useApi();

    const fetchData = useCallback(() => {
        if (!id || loading) return;
        setLoading(true);
        userJobApi.retrieveJob(id)
        .then((response: JobDetailForUser) => {
            setData(response.job);
            setApplication({...response.application});
        })
        .catch(e => apiErrorHandler(e))
        .finally(() => setLoading(false));
    }, [apiErrorHandler, id, loading])
    
    useEffect(() => {
        if (initial) {
            setInitial(false);
            fetchData();
        }
    }, [fetchData, initial])

    
    if (!data || !id) 
        return <></>

    return (
        <div className="w-full mt-6 pt-3 overflow-y-scroll">
            <Card>
                <CardContent>
                    <Typography variant="h2">{data.title}</Typography>
                    <div className="mt-5">
                        {data.description}
                    </div>
                </CardContent>
            </Card>
            {!loading && !initial &&
                <JobApplyForm className="mt-3" jobId={id} application={application}/>
            }
        </div>
    )
}
export default JobDetail;