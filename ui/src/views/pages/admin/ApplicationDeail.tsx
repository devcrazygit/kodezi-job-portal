import { Box, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { handleFileDownload } from "helpers/file";
import useApi from "hooks/useApi";
import applicationAdminApi from "modules/api/application.admin";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ParamType } from "types/common";
import { JobItemType } from "types/models/job";
import ApplicationBadge from "views/components/ApplicationBadge";
import { ApplicationResponseType, ApplicationStatus, Resubmission } from "types/models/application";
import KButton from "views/components/Button";
import { toast } from "react-toastify";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ApplicationDetail = () => {
    const { id } = useParams<ParamType>();
    const [initial, setInitial] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ApplicationResponseType>();
    const [job, setJob] = useState<JobItemType>();
    const [selectResubmission, setSelectResubmission] = useState<boolean>(false);
    const [selectedResubmission, chooseResubmission] = useState<Resubmission>(Resubmission.NONE);
    const [status, setStatus] = useState<ApplicationStatus>();

    const { apiErrorHandler } = useApi();
    const fetchData = useCallback(() => {
        if (loading || !id) return;
        setLoading(true);
        applicationAdminApi.retrieve(id)
        .then((response: { application: ApplicationResponseType, job: JobItemType }) => {
            setData(response.application);
            setJob(response.job);
        })
        .catch(apiErrorHandler)
        .finally(() => setLoading(false));
    }, [apiErrorHandler, id, loading])

    const handleResubmissionClick = useCallback(() => {
        setSelectResubmission(true);
    }, [])
    const handleResubmissionClose = useCallback(() => {
        setSelectResubmission(false);
        chooseResubmission(Resubmission.NONE);
    }, [])
    
    const handleSubmit = useCallback((status: ApplicationStatus) => {
        if (loading || !id) return;
        setStatus(status);
        setLoading(true);
        applicationAdminApi.update(id, {status,  resubmission: selectedResubmission})
        .then((response: ApplicationResponseType) => {
            setData(response);
            setSelectResubmission(false);
            toast('Successfully saved');
        })
        .catch(apiErrorHandler)
        .finally(() => setLoading(false));
    }, [apiErrorHandler, id, loading, selectedResubmission])

    useEffect(() => {
        if (initial) {
            setInitial(false);
            fetchData();
        }
    }, [fetchData, initial])
    if (!data) return null;
    return (
        <div className="w-full mt-6 flex-grow overflow-y-scroll">
            <Card>
                <CardContent>
                    <div className="flex flex-col p-4">
                        <div className="mb-2">
                            <Typography variant="h4">{job?.title}</Typography>
                        </div>
                        <div className="mb-4">
                            <ApplicationBadge application={data} />
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
                            <div className="flex justify-end mr-3 gap-x-3">
                                <KButton variant="contained" color="primary" loading={loading && status === ApplicationStatus.ACCEPTED}
                                    onClick={() => handleSubmit(ApplicationStatus.ACCEPTED)}
                                >
                                    Accept
                                </KButton>
                                <KButton variant="contained" color="warning" onClick={handleResubmissionClick}>Resubmission</KButton>
                                <KButton variant="contained" color="error" loading={loading && status === ApplicationStatus.REJECTED}
                                    onClick={() => handleSubmit(ApplicationStatus.REJECTED)}
                                >Reject</KButton>
                            </div>
                        </Stack>
                    </div>
                    <Modal
                        open={selectResubmission}
                        onClose={handleResubmissionClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <div className="flex flex-col">
                                    <FormControl>
                                        <FormLabel id="resubmission-options">Resubmission Request</FormLabel>
                                        <RadioGroup
                                            // eslint-disable-next-line jsx-a11y/aria-props
                                            value={selectedResubmission}
                                            onChange={(e) => chooseResubmission(parseInt(e.target.value)) }
                                        >
                                            <FormControlLabel value={Resubmission.RESUME} control={<Radio />} label="Resume" />
                                            <FormControlLabel value={Resubmission.COVERLETTER} control={<Radio />} label="Cover Letter" />
                                        </RadioGroup>
                                        <div className="mt-4">
                                            <KButton className="w-full" variant="contained" color="warning" 
                                                disabled={!selectedResubmission}
                                                loading={loading && status === ApplicationStatus.RESUBMISSION}
                                                onClick={() => handleSubmit(ApplicationStatus.RESUBMISSION)}
                                            >
                                                Resubmission
                                            </KButton>
                                        </div>
                                    </FormControl>
                                </div>
                            </Box>
                    </Modal>
                </CardContent>
            </Card>
        </div>
    )
}
export default ApplicationDetail;