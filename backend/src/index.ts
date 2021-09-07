import server from './app/server';
import { connect } from "./db/mongoose";

if (!process.env.PORT) {
    throw new Error('Environment variable PORT is undefined');
}

server.listen(process.env.PORT, async () => {
    console.log(`Server is up on port ${process.env.PORT}`);

    console.log('Connecting to mongoDB...');
    const error = await connect();
    if (error) {
        console.log(error);
        return;
    }
    console.log('Connection successful');
});
