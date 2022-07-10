import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import { JobItemType } from "types/models/job";

const JobItem: React.FC<{ data: JobItemType}> = ({ data }) => {
    return (
        <Card className="flex-auto mb-2">
            <CardActionArea>
                <CardContent>
                    <Typography variant="h5">{ data.title }</Typography>
                    {!!data.authorName && 
                        <Typography variant="subtitle1" className="text-gray-400">Posted By { data.authorName }</Typography>
                    }
                    <div className="mt-4">
                        <Typography variant="body1">
                            {data.description}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
export default JobItem;