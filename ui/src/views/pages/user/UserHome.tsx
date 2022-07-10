import { Card, CardContent, Typography } from "@mui/material";
import useApi from "hooks/useApi";
import userJobApi from "modules/api/job.user";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Pager } from "types/common";
import { JobItemType } from "types/models/job";
import JobItem from "views/pages/components/JobItem";

const UserHome = () => {
    const [jobs, setJobs] = useState<JobItemType[]>([]);
    const [initial, setInitial] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [pager, setPager] = useState<Pager>({ page: 1, size: 10});
    const [loading, setLoading] = useState<boolean>(false);

    const { apiErrorHandler } = useApi();

    const handleLoad = useCallback(() => {
        if (loading || !hasMore) return;
        setLoading(true);
        userJobApi.getJobs(pager)
        .then((response: JobItemType[]) => {
            setJobs(old => [...old, ...response]);
            setHasMore(response.length > 0);
            if (response.length > 0) {
                setPager({...pager, page: pager.page + 1});
            }
        })
        .catch(apiErrorHandler)
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
            <div className="flex w-full justify-center gap-x-4">
                <Card className="flex-auto">
                    <CardContent>
                        <Typography variant="h5">Job Posted : 10</Typography>
                    </CardContent>
                </Card>
                <Card className="flex-auto">
                    <CardContent>
                        <Typography variant="h5">Job Applied : 10</Typography>
                    </CardContent>
                </Card>
            </div>
            <div className="w-full mt-16">
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
                        <Link to={`/user/jobs/${job.id}`} key={job.id}>
                            <JobItem data={job}/>
                        </Link>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    )
}
export default UserHome;

