import { model, Schema, Model, Document } from 'mongoose';
import { hashSync } from 'bcrypt';
import { Job } from './Job.model';
import { PagerResponseType } from '../lib/types/common';

export enum Role {
    ADMIN = 1,
    USER = 2,
}

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    introduction?: string;
    role: Role.ADMIN,
    createDate: Date, 
    updateDate: Date;
    timestamps?: {};
    jobs: Job[]
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, set: (value: string) => hashSync(value, 10) },
    role: { type: Number, default: Role.USER},
    introduction: { type: String, required: false},
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'jobs'
    }],
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
    timestamps: { createDate: Date, updatedDate: Date}}
);

export const UserModel = model<User>('users', UserSchema);