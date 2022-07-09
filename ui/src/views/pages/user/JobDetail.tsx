import { Card, CardContent, Typography } from "@mui/material";
import useApi from "hooks/useApi";
import userJobApi from "modules/api/job.user";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ParamType } from "types/common";
import { AppliationResponseType } from "types/models/application";
import { JobDetailForUser, JobItemType } from "types/models/job";
import JobApplyForm from "views/pages/components/JobApplyForm";

const JobDetail = () => {
    const { id } = useParams<ParamType>();
    const [initial, setInitial] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<JobItemType>();
    const [application, setApplication] = useState<AppliationResponseType>();

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
        <div className="w-full mt-16 overflow-y-scroll">
            <Card>
                <CardContent>
                    <Typography variant="h2">{data.title}</Typography>
                    <div className="mt-5">
                        {data.description}
                    </div>
                </CardContent>
            </Card>
            {/* {application &&
                <Card className="mt-4">
                    <CardContent>
                        <Typography variant="h5">You application</Typography>
                        <Stack className="mt-6" spacing={2}>
                            <div>
                                <h6 className="mb-2"><strong>Phone Number</strong></h6>
                                <Typography variant="body1">{application.phone}</Typography>
                            </div>
                            <div>
                                <h6 className="mb-2"><strong>Cover Letter</strong>{application.resubmission === Resubmission.COVERLETTER && '(Update Requested)'}</h6>
                                <Typography variant="body1">{application.coverletter}</Typography>
                            </div>
                            <div>
                                <h6 className="mb-2"><strong>Submitted Resume{application.resubmission === Resubmission.RESUME && '(Update Requested)'}</strong></h6>
                                <Button variant="outlined" onClick={() => handleFileDownload(application.resume)}>Resume</Button>
                            </div>
                        </Stack>
                    </CardContent>
                </Card>
            } */}
            {!loading && !initial &&
                <JobApplyForm className="mt-3" jobId={id} application={application}/>
            }
        </div>
    )
}
export default JobDetail;