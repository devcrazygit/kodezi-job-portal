import { Role, UserModel } from "../model/User.model";

const USER_SEEDS_COUNT = 500;

const userSeed = async () => {
    // create an admin user
    await UserModel.create({
        role: Role.ADMIN,
        name: 'Admin',
        email: 'admin@t.com',
        password: 'abcabcabc'
    });
    await UserModel.create({
        role: Role.ADMIN,
        name: 'Admin 2',
        email: 'admin2@t.com',
        password: 'abcabcabc'
    });
    
    // create applicant users
    for (let i = 1; i <= USER_SEEDS_COUNT; i++) {
        await UserModel.create({
            role: Role.USER,
            name: `User ${i}`,
            email: `t${i}@t.com`,
            password: 'abcabcabc'
        })
    }
}
export default userSeed;