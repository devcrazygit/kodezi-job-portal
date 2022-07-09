import { Button, Card } from "@mui/material";
import useApi from "hooks/useApi";
import adminJobApi from "modules/api/job.admin";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Pager } from "types/common";
import { JobItemType } from "types/models/job";
import JobItem from "views/pages/components/JobItem";

const AdminHome = () => {
    const [jobs, setJobs] = useState<JobItemType[]>([]);
    const [initial, setInitial] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [pager, setPager] = useState<Pager>({ page: 1, size: 10});
    const [loading, setLoading] = useState<boolean>(false);

    const { apiErrorHandler } = useApi();

    const handleLoad = useCallback(() => {
        if (loading || !hasMore) return;
        setLoading(true);
        adminJobApi.getJobs(pager)
        .then((response: JobItemType[]) => {
            setJobs(old => [...old, ...response]);
            setHasMore(response.length > 0);
            if (response.length > 0) {
                setPager({...pager, page: pager.page + 1});
            }
        })
        .catch(e => apiErrorHandler(e))
        .finally(() => setLoading(false));
    }, [apiErrorHandler, hasMore, loading, pager]);

    const handleScroll = useCallback((e: any) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop + clientHeight > scrollHeight - 50) {
            handleLoad();
        }
    }, [handleLoad])

    useEffect(() => {
        if (initial) {
            setInitial(false);
            handleLoad();
        }
    }, [handleLoad, handleScroll, initial])

    return (
        <div className="flex flex-col flex-grow overflow-y-scroll pt-4" id="job-list">
            <div className="flex">
                <Button variant="contained">Post Job</Button>
            </div>
            <div className="w-full mt-16">
                <Card>
                    <InfiniteScroll
                        dataLength={jobs.length}
                        next={handleLoad}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'unset'
                        }}
                        hasMore={hasMore}
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
                        scrollableTarget="job-list"
                    >
                        {jobs.map(job => (
                            <Link to={`/admin/job/${job.id}`} key={job.id}>
                                <JobItem data={job}/>
                            </Link>
                        ))}
                    </InfiniteScroll>
                </Card>
            </div>
        </div>
    )
};

export default AdminHome;