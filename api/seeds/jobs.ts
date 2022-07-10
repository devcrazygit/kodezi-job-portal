import { JobModel } from "../model/Job.model";
import { Role, UserModel } from "../model/User.model"

const jobSeed = async () => {
    const admins = await UserModel.find({ role: Role.ADMIN });
    const [admin1, admin2] = admins;
    if (!admin1) {
        throw new Error('Please seed users first');
    }
    for (let i = 1; i < 15; i++) {
        const job = await JobModel.create({
            title: `Job ${i}`,
            description: `Good job ${i}`,
            user: admin1
        });
        admin1.jobs.push(job);
        await admin1.save();
    }
    for (let i = 1; i < 15; i++) {
        const job = await JobModel.create({
            title: `Job ${i}`,
            description: `Good job ${i}`,
            user: admin2
        });
        admin2.jobs.push(job);
        await admin2.save();
    }
}
export default jobSeed;