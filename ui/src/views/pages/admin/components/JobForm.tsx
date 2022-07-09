import { Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import useApi from "hooks/useApi";
import useFormData from "hooks/useFormData";
import adminJobApi from "modules/api/job.admin";
import { useCallback, useState } from "react";
import { Resubmission } from "types/models/application";
import { JobFormRequest } from "types/models/job";
import { RulesType } from "types/validation";
import KButton from "views/components/Button";
import ValidationErrorMessage from "views/components/ValidationErrorMessage";

const JobForm = () => {
    const [loading, setLoading] = useState(false);
    const rules: RulesType<JobFormRequest> = {
        title: ['required', 'maxLength:100'],
        description: ['required', 'maxLength:40000']
    }
    const { data, errors, onInput, validate }  = useFormData<JobFormRequest>({
        title: '',
        description: ''
    });
    const { apiErrorHandler } = useApi();
    const handleSubmit = useCallback(() => {
        if (loading) return;
        if (validate()) return;
        // setLoading(true);
        
    }, [])
    return (
        <Card>
            <CardContent>
                <div className="p-5 pt-3">
                    <div className="mb-4">
                        <Typography variant="h5">Post a Job</Typography>
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
                        <KButton variant="contained" onClick={handleSubmit}>Submit</KButton>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default JobForm;