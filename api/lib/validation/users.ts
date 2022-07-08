import { Schema } from 'express-validator'
import { PageQuery } from './common'

export const userQuery: Schema = {
    ...PageQuery,
}
export const userRegisterRequest: Schema = {
    name: {
        in: ['body'],
        errorMessage: 'Name is required',
        isLength: {
            options: {
                min: 1,
                max: 50
            }
        }
    },
    email: {
        in: ['body'],
        errorMessage: 'Email is required',
        isEmail: true
    },
    password: {
        in: ['body'],
        errorMessage: 'Password is required',
        isLength: {
            options: {
                min: 6
            }
        }
    },
}


export const userLoginRequest: Schema = {
    email: {
        in: ['body'],
        errorMessage: 'Email is required',
        isEmail: true
    },
    password: {
        in: ['body'],
        errorMessage: 'Password is required',
        isLength: {
            options: {
                min: 6
            }
        }
    },
}