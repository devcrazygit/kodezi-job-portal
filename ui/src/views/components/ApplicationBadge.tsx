import { useMemo } from "react";
import { ApplicationDataType, ApplicationStatus, Resubmission } from "types/models/application";

const ApplicationBadge = ({application}: {application: ApplicationDataType}) => {

    const scheme = useMemo(() => {
        if (application.status === ApplicationStatus.SUBMITTED) return {color: 'bg-blue-600', label: 'Submitted'}
        if (application.status === ApplicationStatus.ACCEPTED) return {color: 'bg-green-600', label: 'Accepted'}
        if (application.status === ApplicationStatus.REJECTED) return {color: 'bg-red-600', label: 'Rejected'}
        if (application.status === ApplicationStatus.RESUBMISSION) return {color: 'bg-orange-600', label: 'Resubmission'}
    }, [application.status])

    return (
        <label className="flex w-fit gap-x-3">
            <div className={"w-fit px-2 py-1 text-white rounded max-w-xs text-sm " + scheme?.color}>
                {scheme?.label}
            </div>
            {application.status === ApplicationStatus.RESUBMISSION && application.resubmission === Resubmission.NONE &&
                <div className={"w-fit px-2 py-1 text-white rounded max-w-xs text-sm bg-green-500"}>
                    Fixed
                </div>
            }
        </label>
    )
}
export default ApplicationBadge;