import userSeed from "./users";
import jobSeed from "./jobs";
import { connect } from "../config/db.config";

const dbSeed = async () => {
    // connect();
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
        }
        return;
    }

    console.log('running all seeds');
    await userSeed();
    await jobSeed();
    console.log('seed end');
}

dbSeed();