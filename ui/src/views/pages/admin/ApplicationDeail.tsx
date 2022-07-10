import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { handleFileDownload } from "helpers/file";
import useApi from "hooks/useApi";
import applicationAdminApi from "modules/api/application.admin";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ParamType } from "types/common";
import { ApplicationDataType } from "types/models/application";
import { JobItemType } from "types/models/job";

const ApplicationDetail = () => {
    const { id } = useParams<ParamType>();
    const [initial, setInitial] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ApplicationDataType>();
    const [job, setJob] = useState<JobItemType>();

    const { apiErrorHandler } = useApi();
    const fetchData = useCallback(() => {
        if (loading || !id) return;
        setLoading(true);
        applicationAdminApi.retrieve(id)
        .then((response: { application: ApplicationDataType, job: JobItemType }) => {
            setData(response.application);
            setJob(response.job);
        })
        .catch(apiErrorHandler)
        .finally(() => setLoading(false));
    }, [apiErrorHandler, id, loading])

    useEffect(() => {
        if (initial) {
            setInitial(false);
            console.log('fetching')
            fetchData();
        }
    }, [fetchData, initial])
    if (!data) return null;
    return (
        <div className="w-full mt-6 flex-grow overflow-y-scroll">
            <Card>
                <CardContent>
                    <div className="flex flex-col p-4">
                        <div className="mb-4">
                            <Typography variant="h4">{job?.title}</Typography>
                        </div>
                        <div className="mb-4">
                            <Typography variant="h6">Applicant Information</Typography>
                        </div>
                        <Stack spacing={2}>
                            <div className="flex mt-4">
                                <div className="w-40">
                                    <Typography variant="subtitle1" fontWeight={1000}>Name : </Typography>
                                </div>
                                <Typography variant="body1">{data.author?.name}</Typography>
                            </div>
                            <div className="flex mt-4">
                                <div className="w-40">
                                    <Typography variant="subtitle1" fontWeight={1000}>Email : </Typography>
                                </div>
                                <Typography variant="body1">{data.author?.email}</Typography>
                            </div>
                            <div className="flex mt-4">
                                <div className="w-40">
                                    <Typography variant="subtitle1" fontWeight={1000}>Phone : </Typography>
                                </div>
                                <Typography variant="body1">{data.phone}</Typography>
                            </div>
                            <div className="flex mt-4 flex-col gap-y-2">
                                <div className="w-40">
                                    <Typography variant="subtitle1" fontWeight={1000}>Cover Letter : </Typography>
                                </div>
                                <div>
                                    <Typography variant="body1" className="whitespace-pre-line break-all">{data.coverletter}</Typography>
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <Button 
                                    variant="text" 
                                    onClick={() => handleFileDownload(data.resume)}
                                >
                                    Submitted Resume
                                </Button>
                            </div>
                        </Stack>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
export default ApplicationDetail;