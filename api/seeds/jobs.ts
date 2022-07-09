import { JobModel } from "../model/Job.model";
import { Role, UserModel } from "../model/User.model"

const jobSeed = async () => {
    const admin = await UserModel.findOne({ role: Role.ADMIN });
    if (!admin) {
        throw new Error('Please seed users first');
    }
    for (let i = 1; i < 30; i++) {
        const job = await JobModel.create({
            title: `Job ${i}`,
            description: `Good job ${i}`,
            user: admin
        });
        admin.jobs.push(job);
        await admin.save();
    }
}
export default jobSeed;