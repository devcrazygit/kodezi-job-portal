import userSeed from "./users";
import jobSeed from "./jobs";
import { connect } from "../config/db.config";
import applicationSeed from "./applications";

const dbSeed = async () => {
    connect();
    const args = process.argv.slice(2);
    console.log('args', args);
    if (args[0]) {
        switch(args[0]) {
            case 'users':
                await userSeed();
                break;
            case 'jobs':
                await jobSeed();
                break;
            case 'applications':
                await applicationSeed();
        }
        return;
    }

    console.log('running all seeds');
    await userSeed();
    await jobSeed();
    await applicationSeed();
    console.log('seed end');
}

dbSeed();