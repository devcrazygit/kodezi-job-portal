import { Button, Card, CardContent, CardTypeMap, Stack, TextField, Typography } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { saveAs } from "file-saver";
import useApi from "hooks/useApi";
import useFormData from "hooks/useFormData";
import userJobApi from "modules/api/job.user";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ID } from "types/common";
import { AppliationResponseType, ApplicationRequest, Resubmission } from "types/models/application";
import { RulesType } from "types/validation";
import KButton from "views/components/Button";
import ValidationErrorMessage from "views/components/ValidationErrorMessage";

export type JobApplyFormProps = {
    jobId: ID,
    application?: AppliationResponseType
} & DefaultComponentProps<CardTypeMap<{}, "div">>

const JobApplyForm: FC<JobApplyFormProps> = ({jobId, application, ...rest}) => {
    const [loading, setLoading] = useState(false);

    const [currentApplication, setCurrentApplication] = useState(application);
    const { apiErrorHandler } = useApi();
    const phoneEditable = useMemo(() => !currentApplication?.id, [currentApplication])
    const coverletterEditable = useMemo(() => !currentApplication?.id || (currentApplication && currentApplication.resubmission === Resubmission.COVERLETTER), [currentApplication])
    const resumeEditable = useMemo(() => !currentApplication?.id || (currentApplication && currentApplication.resubmission === Resubmission.RESUME), [currentApplication])


    const fileRef = useRef<HTMLInputElement>(null);
    const rules: RulesType<ApplicationRequest> = {
        phone: ['required'],
        coverletter: ['required'],
        resume: ['required']
    }
    const {data, errors, validate, onInput, setErrors, setSubData} = useFormData<ApplicationRequest>({
        phone: (application ? application.phone : ''),
        coverletter: (application ? application.coverletter : ''),
        resume: null
    })

    const validateResume = useCallback((resume: any) => {
        if ('File' in window && resume instanceof File) {
            if (![
                'application/pdf', 
                'application/msword', 
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ].includes(resume.type)) {
                setErrors((old) => ({
                    ...old,
                    resume: [
                        'Resume should be doc, docx or PDF file',
                    ],
                }));
                return false;
            }
            if (resume.size > 5000000) {
                setErrors((old) => ({
                    ...old,
                    avatar: ['Sorry, resume should be less than 5MB'],
                }));
                return false;
            }
        }
        return true;
    }, [setErrors])

    const handleResumeSelect = useCallback(({ target }: any) => {
        setErrors(old => ({...old, resume: []}))
        const files = target.files;
        if (!files.length) {
            setSubData({ resume: null });
        } else {
            const file = files[0] as File;
            let isValid = validateResume(file);
            if (!isValid && fileRef.current) {
                fileRef.current.value = "";
                return;
            }
            console.log({file});
            setSubData({ resume: file })
        }
    }, [setErrors, setSubData, validateResume]);

    const handleSubmit = useCallback(() => {
        if (loading) return;
        let result = validate();
        if (result) return;
        if (!validateResume(data.resume)) return;
        setLoading(true);
        userJobApi.applyJob(jobId, data)
        .then((response: AppliationResponseType) => {
            setCurrentApplication(response);
            toast.success('Successfully submitted');
        })
        .catch(e => apiErrorHandler(e))
        .finally(() => setLoading(false));
    }, [apiErrorHandler, data, jobId, loading, validate, validateResume]);

    
    const handleFileDownload = useCallback((url?: string) => {
        if (!url) return;
        const ext = url.split('.').pop();
        saveAs(url, `resume.${ext}`);
    }, [])

    return (
        <Card {...rest}>
            <CardContent>
                <div className="p-5 pt-3">
                    <div className="mb-4">
                        <Typography variant="h5">Apply Form</Typography>
                    </div>
                    <Stack spacing={3}>
                        <TextField label="Phone Number" 
                            onChange={onInput('phone')} 
                            value={data.phone || ''} 
                            error={!!errors.phone?.length}
                            inputProps={{readOnly: !phoneEditable}}
                        />
                        <ValidationErrorMessage
                            errors={errors.phone}
                            params={{ name: 'Phone Number' }}
                            rules={rules.phone}
                        />
                        <TextField label={"Cover Letter" + (currentApplication?.resubmission === Resubmission.COVERLETTER ? '(Update Requested)' : '')}
                            multiline rows={5} 
                            onChange={onInput('coverletter')} 
                            value={data.coverletter} 
                            error={!!errors.coverletter?.length || (currentApplication?.resubmission === Resubmission.COVERLETTER)} 
                            inputProps={{ readOnly: !coverletterEditable}}
                        />
                        <ValidationErrorMessage
                            errors={errors.coverletter}
                            params={{ name: 'Cover Letter' }}
                            rules={rules.coverletter}
                        />
                        <div className="flex gap-x-4 align-bottom">
                            <Button variant="outlined" component="label" disabled={!resumeEditable}
                                color={
                                    errors.resume?.length || (currentApplication?.resubmission === Resubmission.RESUME) ? 'error' : 'primary'
                                }
                            >
                                Resume *
                                <input type="file" hidden ref={fileRef} onInput={handleResumeSelect} 
                                    accept="application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                />
                            </Button>
                            {data.resume &&
                                <Typography variant="subtitle2">{data.resume.name}</Typography>
                            }
                        </div>
                        <ValidationErrorMessage
                            errors={errors.resume}
                            params={{ name: 'Resume' }}
                            rules={rules.resume}
                        />
                        {currentApplication && 
                            <div className="flex justify-start">
                                <Button 
                                    variant="text" 
                                    onClick={() => handleFileDownload(currentApplication.resume)}
                                >
                                    Submitted Resume
                                </Button>
                            </div>
                        }
                    </Stack>
                    <div className="flex justify-end mt-4">
                        <KButton variant="contained" onClick={handleSubmit} loading={loading}>Submit</KButton>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default JobApplyForm;