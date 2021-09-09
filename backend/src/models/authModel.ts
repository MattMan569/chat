import mongoose from 'mongoose';

import User from './userModel';
import { IAuth } from '../types';

const authSchema = new mongoose.Schema<IAuth>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export const Auth = mongoose.model<IAuth>('Auth', authSchema);

export default Auth;
