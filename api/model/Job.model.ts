import { model, Schema, Model, Document, PaginateModel } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { User } from './User.model';

export interface Job extends Document {
    title: string;
    description: string;
    createDate: string, 
    updateDate: string;
    timestamps?: {};
    user?: User;
}

const JobSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
    timestamps: { createDate: Date, updatedDate: Date},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});
JobSchema.plugin(paginate);

export const JobModel = model<Job, PaginateModel<Job>>('jobs', JobSchema);