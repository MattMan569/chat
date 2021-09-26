import app from './app/app';
import server from './app/server';
import { connect } from "./db/mongoose";

console.log('Connecting to database...');
connect().then(() => {
    console.log('Connection successful');
    app.emit('db ready');
});

app.on('app ready', () => {
    console.log('Starting server...');

    if (!process.env.PORT) {
        throw new Error('Environment variable PORT is undefined');
    }

    server.listen(process.env.PORT, () => {
        console.log(`Server is up on port ${process.env.PORT}`);
    });
});
