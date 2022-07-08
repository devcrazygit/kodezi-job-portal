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

export const jobUpdateRequest: Schema = {
    id: {
        in: ['params']
    },
    ...jobCreateRequest
}

export const jobQueryRequest: Schema = {
    search: {
        in: ['query'],
        optional: { options: { nullable: true }}
    },
    ...PageQuery
}