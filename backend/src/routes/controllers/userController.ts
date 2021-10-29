import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Session, SessionData } from 'express-session';
import mongoose, { Document } from 'mongoose';

import User from './../../models/userModel';
import { IUser } from '../../types';
import { IUserFrontend } from 'types';

const createSession = (session: Session & Partial<SessionData>, user: Document<IUser> & IUser) => {
    session.userId = user.id;
    session.username = user.username;
    session.loggedIn = true;
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const password = await bcrypt.hash(req.body.password, 12);

        const user = await User.create({
            username: req.body.username,
            password,
        });

        createSession(req.session, user);

        res.status(201).json({
            id: user.id,
            username: user.username,
        } as IUserFrontend);
    } catch (error) {
        if (error instanceof mongoose.Error) {
            if (error.name) {
                console.log('yes');
                return;
            }
            console.log('no');
            return;
        }

        console.error(error);
        res.status(500).json();
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findOne({
            username: req.body.username,
        });

        if (!user) {
            res.status(404).json('No user with that username exists');
            return;
        }

        const valid = await bcrypt.compare(req.body.password, user.password);

        if (!valid) {
            res.status(400).json('Password is incorrect');
            return;
        }

        createSession(req.session, user);
        res.json({
            id: user.id,
            username: user.username,
        } as IUserFrontend);
    } catch (error) {
        console.error(error);
        res.status(500).json();
    }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.session.loggedIn) {
            res.status(401).json();
            return;
        }

        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                res.status(500).json();
                return;
            }

            res.json();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json();
    }
};

export const validateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        if (req.session.loggedIn) {
            res.json({
                id: req.session.userId,
                username: req.session.username,
            });
        } else {
            res.json(false);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json();
    }
};
