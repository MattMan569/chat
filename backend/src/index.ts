import server from './app/server';
import { connect } from "./db/mongoose";
require('./socketIO/io');

connect();

if (!process.env.PORT) {
    throw new Error('Environment variable PORT is undefined');
}

server.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`);
});
