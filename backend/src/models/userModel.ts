import mongoose from "mongoose";
import { IUser } from "../types";

// https://mongoosejs.com/docs/typescript.html
// https://mongoosejs.com/docs/guide.html#methods
// https://mongoosejs.com/docs/typescript/statics.html

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 32,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
    }
}, {
    timestamps: true,
});

export const User = mongoose.model<IUser>('User', userSchema);

export default User;
