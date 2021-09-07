import mongoose, { Document, Model } from "mongoose";
import { IUser } from "../types";

// Define document methods
type UserDocument = Document<IUser>

// Define model statics
type UserModel = Model<UserDocument>

const userSchema = new mongoose.Schema({
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

export const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
