import { Schema } from "express-validator";

export const PageQuery: Schema = {
    page: {
        in: ['query'],
        optional: { options: { nullable: true } },
        isInt: {
            errorMessage: 'Page should be positive value',
            options: { min: 0 }
        },
        toInt: true,
    },
    size: {
        in: ['query'],
        optional: { options: { nullable: true } },
        isInt: {
            errorMessage: 'Page size should be positive value',
            options: { min: 0 }
        },
        toInt: true
    },
}
export const retrieveQuery: Schema = {
    id: {
        in: ['params']
    }
}