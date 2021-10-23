import ES from 'express-session';
import MongoStore from 'connect-mongo';
import { v4 as uuidv4 } from 'uuid';

if (!process.env.SESSION_SECRET) {
    throw new Error('Environment variable SESSION_SECRET is undefined');
}

if (!process.env.ENV) {
    throw new Error('Environment variable ENV is undefined');
}

export const session = ES({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
        secure: process.env.ENV === 'production' ? true : false,
        maxAge: 604800000, // 7 days
        sameSite: true, // TODO test
    },
    genid: () => uuidv4(),
    saveUninitialized: false,
    resave: false,
    rolling: true,
    unset: 'destroy',
});

export default session;
