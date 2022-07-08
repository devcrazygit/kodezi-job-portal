import { Schema } from "express-validator";

export const PageQuery: Schema = {
    page: {
        in: ['params', 'query'],
        errorMessage: 'Page is required',
        isInt: {
            errorMessage: 'Page should be positive value',
            options: { min: 0 }
        },
    },
    size: {
        isInt: {
            errorMessage: 'Page size should be positive value',
            options: { min: 0 }
        },
    },
}