import { ApplicationModel } from "../model/Application.model";
import { JobModel } from "../model/Job.model";
import { Role, UserModel } from "../model/User.model"
import { LoremIpsum } from "lorem-ipsum";


const applicationSeed = async () => {
    const jobs = await JobModel.find().sort({ createDate: 'ascending' });
    const users = await UserModel.find().sort({ createDate: 'ascending' });
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

        })
    })
    
    // for (let i = 1; i < 30; i++) {
    //     const job = await JobModel.create({
    //         title: `Job ${i}`,
    //         description: `Good job ${i}`,
    //         user: admin1
    //     });
    //     admin.jobs.push(job);
    //     await admin.save();
    // }
}
export default applicationSeed;