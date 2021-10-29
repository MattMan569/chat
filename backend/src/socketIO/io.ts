// import sharedsession from 'express-socket.io-session';
// import { NextFunction, Request, Response } from 'express';
import sharedsession from 'express-socket.io-session';
import socketio from 'socket.io';
import session from 'express-session';

import { IMessage } from 'types';
import server from '../app/server';
import sessionMiddleware from '../middleware/session';

interface Handshake {
    session?: session.Session & Partial<session.SessionData> | undefined;
    sessionID?: string | undefined;
}

if (!process.env.ENV) {
    throw new Error('Environment variable ENV is undefined');
}

const io = new socketio.Server(server, {
    cors: {
        credentials: true,
        origin: process.env.ENV === 'production' ? true : 'http://localhost:4200',
    },
});

io.use(sharedsession(sessionMiddleware));

io.on('connection', (socket) => {
    const handshake = socket.handshake as Handshake;
    if (!handshake.session?.username) {
        socket.disconnect(true);
        return;
    }

    const username = handshake.session.username;

    socket.emit('serverMessage', `${username} has joined`);

    socket.on('message', (message: string) => {
        io.emit('message', {
            message,
            author: handshake.session?.username,
        } as IMessage);
    });

    socket.on('disconnect', () => {
        socket.emit('serverMessage', `${username} has left`);
    });
});
