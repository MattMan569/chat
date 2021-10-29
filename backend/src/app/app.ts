import express from 'express';
import cors from 'cors';

import session from '../middleware/session';
import userRouter from '../routes/userRouter';

if (!process.env.ENV) {
    throw new Error('Environment variable ENV is undefined');
}

export const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.ENV === 'production' ? true : 'http://localhost:4200',
}));

app.use(express.json());

// TODO check if necessary 
// app.use(express.urlencoded({
//     extended: true,
// }));

app.use(session);

app.use('/api/user', userRouter);

export default app;
