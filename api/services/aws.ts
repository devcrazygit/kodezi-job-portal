import * as AWS from 'aws-sdk';
import { Body } from 'aws-sdk/clients/s3';

export class AWSService {
    
    private s3: AWS.S3;
    static instance: AWSService;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.AWS_S3_SECRET_KEY
        })
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new AWSService();
        }
        return this.instance;
    }

    async upload(blob: Body, key: string) {
        const uploaded = await this.s3.upload({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
            Body: blob
        }).promise();
        return uploaded;
    }
}