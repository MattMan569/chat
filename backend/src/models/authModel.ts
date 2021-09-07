import mongoose, { Document, Model, Schema } from 'mongoose';

import User from './userModel';
import { IAuth } from '../types';

// Define document methods
export type IAuthDocument = Document<IAuth>

// Define model statics
export type IAuthModel = Model<IAuthDocument>

const authSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
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

export const Auth = mongoose.model<IAuthDocument, IAuthModel>('Auth', authSchema);

export default Auth;
