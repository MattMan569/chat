import mongoose, { Model, ObjectId } from 'mongoose';

import User from './userModel';
import { IAuth } from '../types';

interface AuthModel extends Model<IAuth> {
    authorizeUser(userId: string, refreshToken: string): Promise<string>;
}

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

authSchema.static('authorizeUser', async (userId: ObjectId, refreshToken: string) => {
    const auth = await Auth.findOne({ userId });

    // Update the user's refresh token if they have one, otherwise create one
    if (!auth) {
        // Verify the provided user id is valid
        if (!await User.findById(userId)) {
            throw new Error('Invalid user id');
        }

        await Auth.create({
            userId,
            refreshToken,
        });
    } else {
        auth.refreshToken = refreshToken;
        await auth.save();
    }
});

export const Auth = mongoose.model<IAuth, AuthModel>('Auth', authSchema);

export default Auth;
