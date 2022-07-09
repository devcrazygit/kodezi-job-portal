import { Document, model, Schema } from "mongoose";
import { Job } from "./Job.model";
import { User } from "./User.model";

export enum Resubmission {
    NONE = 0,
    COVERLETTER = 1,
    RESUME = 2
}

export interface ApplicationData {
    job?: Job;
    user?: User;
    phone?: string;
    coverletter: string;
    resume: string;
    resubmission: Resubmission
};
export interface Application extends Document, ApplicationData {}

const ApplicationSchema: Schema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'jobs'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    phone: { type: String, required: false},
    coverletter: { type: String },
    resume: { type: String },
    resubmission: { type: Number, default: Resubmission.NONE }
})

export const ApplicationModel = model<Application>('applications', ApplicationSchema);