import { ApplicationModel, ApplicationStatus, Resubmission } from "../model/Application.model";
import { JobModel } from "../model/Job.model";
import { Role, UserModel } from "../model/User.model"
import { LoremIpsum } from "lorem-ipsum";


const applicationSeed = async () => {
    const jobs = await JobModel.find().sort({ createDate: 'ascending' });
    const users = await UserModel.find({ role: parseInt(Role.USER.toString()) }).sort({ createDate: 'ascending' });
    const [job1] = jobs;

    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
          max: 8,
          min: 4
        },
        wordsPerSentence: {
          max: 16,
          min: 4
        }
    });
    
    await users.forEach(async user => {
        const number = Math.random().toString().slice(2,11);
        await ApplicationModel.create({
            job: job1,
            user,
            phone: number,
            coverletter: lorem.generateSentences(6),
            resume: 'https://kodezi-test.s3.amazonaws.com/bb1at.docx',
            resubmission: Resubmission.NONE,
            status: ApplicationStatus.SUBMITTED
        })
    })
    
}
export default applicationSeed;