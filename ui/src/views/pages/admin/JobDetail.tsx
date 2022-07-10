import useApi from "hooks/useApi";
import applicationAdminApi from "modules/api/application.admin";
import adminJobApi from "modules/api/job.admin";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Pager, ParamType } from "types/common";
import { ApplicationDataType } from "types/models/application";
import { JobItemType } from "types/models/job";
import JobForm from "views/pages/admin/components/JobForm";
import ApplicationItem from "views/pages/components/ApplicationItem";

const JobDetail = () => {
    const { id } = useParams<ParamType>();
    const [initial, setInitial] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<JobItemType>();
    const [applications, setApplications] = useState<ApplicationDataType[]>([])

    const [hasMore, setHasMore] = useState<boolean>(true);
    const [pager, setPager] = useState<Pager>({ page: 1, size: 10});
    

    const { apiErrorHandler } = useApi();

    const fetchData = useCallback(() => {
        if (!id) return;
        setLoading(true);
        adminJobApi.retrieveJob(id)
        .then((response: JobItemType) => {
            setData(response);
        })
        .catch(e => apiErrorHandler(e))
        .finally(() => setLoading(false));
    }, [apiErrorHandler, id]);

    const handleApplLoad = useCallback(() => {
        if (loading || !hasMore || !id) return;
        setLoading(true);
        applicationAdminApi.get(id, pager)
        .then((response: ApplicationDataType[]) => {
            setApplications(old => [...old, ...response]);
            setHasMore(response.length > 0);
            if (response.length > 0) {
                setPager({...pager, page: pager.page + 1});
            }
        })
        .catch(apiErrorHandler)
        .finally(() => setLoading(false));
    }, [apiErrorHandler, hasMore, id, loading, pager]);
    
    useEffect(() => {
        if (initial) {
            setInitial(false);
            fetchData();
            handleApplLoad();
        }
    }, [fetchData, handleApplLoad, initial])

    
    if (!data || !id) 
        return <></>

    return (
        <div className="w-full mt-6 flex-grow overflow-y-scroll" id="job-detail">
            <JobForm job={data}/>
            <div className="w-full mt-6">
            <InfiniteScroll
                    dataLength={applications.length}
                    next={handleApplLoad}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'unset'
                    }}
                    hasMore={initial || hasMore}
                    loader={
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <ClipLoader size={30} color="#d0b052" />
                        </div>
                    }
                    scrollableTarget="job-detail"
                >
                    {applications.map(application => (
                        <Link to={`/admin/applications/${application.id}`} key={application.id}>
                            xxx
                            <ApplicationItem data={application} />
                        </Link>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    )
}
export default JobDetail;