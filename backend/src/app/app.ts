import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

import userRouter from '../routes/userRouter';

export const app = express();

app.on('db ready', () => {
    console.log('Setting up app...');

    if (!process.env.SESSION_SECRET) {
        throw new Error('Environment variable SESSION_SECRET is undefined');
    }

    app.use(cors({
        credentials: true,
        origin: true, // same site
    }));

    app.use(express.json());

    // TODO check if necessary 
    // app.use(express.urlencoded({
    //     extended: true,
    // }));

    app.use(session({
        secret: process.env.SESSION_SECRET,
        store: MongoStore.create({ client: mongoose.connection.getClient() }),
        cookie: {
            secure: true,
            maxAge: 604800000, // 7 days
            // sameSite: true, // TODO test
        },
        genid: () => uuidv4(),
        saveUninitialized: false,
        resave: false,
        rolling: true,
        unset: 'destroy',
    }));

    app.use('/api/user', userRouter);

    console.log('App set up');
    app.emit('app ready');
});

export default app;
