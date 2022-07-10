import { Card, CardContent, CardTypeMap, Stack, TextField, Typography } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import useApi from "hooks/useApi";
import useFormData from "hooks/useFormData";
import adminJobApi from "modules/api/job.admin";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { JobFormRequest, JobItemType } from "types/models/job";
import { RulesType } from "types/validation";
import KButton from "views/components/Button";
import ValidationErrorMessage from "views/components/ValidationErrorMessage";

type JobFormProps = {
    job?: JobItemType
} & DefaultComponentProps<CardTypeMap<{}, "div">>

const JobForm: FC<JobFormProps> = ({ job }) => {
    const navigate = useNavigate();
    const [currentJob, setCurrentJob] = useState(job);
    const [loading, setLoading] = useState(false);
    const rules: RulesType<JobFormRequest> = {
        title: ['required', 'maxLength:100'],
        description: ['required', 'maxLength:40000']
    }
    const { data, errors, onInput, validate }  = useFormData<JobFormRequest>({
        title: (currentJob ? currentJob.title : ''),
        description: (currentJob ? currentJob.description : '')
    });
    const { apiErrorHandler } = useApi();
    const handleSubmit = useCallback(() => {
        if (loading) return;
        if (validate()) return;
        setLoading(true);
        let request;
        if (currentJob) {
            request = adminJobApi.updateJob(currentJob.id, data);
        } else {
            request = adminJobApi.createJob(data);
        }
        request.then((response: JobItemType) => {
            if (currentJob) {
                toast.success('Successfully updated');
            } else {
                toast.success('Successfully posted');
            }
            setCurrentJob(response);
            navigate(`/admin/jobs/${response.id}`);
        })
        .catch(apiErrorHandler)
        .finally(() => setLoading(false));
    }, [apiErrorHandler, currentJob, data, loading, navigate, validate])
    return (
        <Card>
            <CardContent>
                <div className="p-5 pt-3">
                    <div className="mb-4">
                        <Typography variant="h5">{job ? 'Edit Job' : 'Post Job'}</Typography>
                    </div>
                    <Stack spacing={3}>
                        <TextField label="Title" 
                            onChange={onInput('title')} 
                            value={data.title || ''} 
                            error={!!errors.title?.length}
                        />
                        <ValidationErrorMessage
                            errors={errors.title}
                            params={{ name: 'Title' }}
                            rules={rules.title}
                        />
                        <TextField label={"Description"}
                            multiline rows={5} 
                            onChange={onInput('description')} 
                            value={data.description} 
                            error={!!errors.description?.length} 
                        />
                        <ValidationErrorMessage
                            errors={errors.description}
                            params={{ name: 'Description' }}
                            rules={rules.description}
                        />
                    </Stack>
                    <div className="flex justify-end mt-4">
                        <KButton variant="contained" onClick={handleSubmit} loading={loading}>Submit</KButton>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default JobForm;