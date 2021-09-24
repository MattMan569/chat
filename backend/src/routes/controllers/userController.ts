import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from './../../models/userModel';
import Auth from './../../models/authModel';
import mongoose from 'mongoose';
import { encodeAccessToken, encodeRefreshToken } from '../../util/jwt';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const password = await bcrypt.hash(req.body.password, 12);

        const user = await User.create({
            username: req.body.username,
            password,
        });

        res.status(201).json(user);
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
            res.status(401).json('Password is incorrect');
            return;
        }

        const accessToken = encodeAccessToken(user.username, user.id);
        const refreshToken = encodeRefreshToken(user.id);

        await Auth.authorizeUser(user.id, refreshToken);

        res.json();
    } catch (error) {
        console.error(error);
        res.status(500).json();
    }
};
