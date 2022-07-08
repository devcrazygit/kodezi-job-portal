import { Schema } from "express-validator";
import { PageQuery } from "./common";

export const jobCreateRequest: Schema = {
    title: {
        in: ['body'],
        isLength: {
            options: {
                max: 100
            }
        }
    },
    description: {
        in: ['body'],
        isLength: {
            options: {
                max: 40000
            }
        }
    }
}
export const jobRetrieveRequest: Schema = {
    id: {
        in: ['params']
    },
}

export const jobUpdateRequest: Schema = {
    ...jobRetrieveRequest,
    ...jobCreateRequest
}


export const jobQueryRequest: Schema = {
    search: {
        in: ['query'],
        optional: { options: { nullable: true }}
    },
    ...PageQuery
}