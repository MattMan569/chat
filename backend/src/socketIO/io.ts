// import sharedsession from 'express-socket.io-session';
// import { NextFunction, Request, Response } from 'express';
import sharedsession from 'express-socket.io-session';
import socketio from 'socket.io';

import server from '../app/server';
import session from '../middleware/session';

const io = new socketio.Server(server);

// io.use((socket, next) => {
//     // const req = ;
//     // const res = req.res as Response;
//     session(socket.request as Request, {} as Response, next as NextFunction);
// });

io.use(sharedsession(session));

io.on('connection', (socket) => {
    console.log(socket.handshake.auth);
    // console.log(socket.handshake.session);
    console.log((socket.handshake as any).session);
});
