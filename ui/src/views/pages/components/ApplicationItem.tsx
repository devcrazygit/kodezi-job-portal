import { Avatar, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import { ApplicationDataType } from "types/models/application";

const ApplicationItem: React.FC<{data: ApplicationDataType}> = ({data}) => {

    return (
        <Card className="flex-auto mb-2">
            <CardActionArea>
                <CardContent>
                    <div className="p-4 flex flex-col">
                        <div className="flex items-center gap-x-3">
                            <Avatar />
                            <Typography variant="subtitle1">{ data.author?.name }</Typography>
                        </div>
                        <div className="mt-4">
                            <Typography variant="body1" className="whitespace-pre-line break-all">
                                {data.coverletter}
                            </Typography>
                        </div>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )

}
export default ApplicationItem;