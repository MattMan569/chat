import jwt from 'jsonwebtoken';
import { IToken } from '../types';

// Encode the user's username into the token and then return it
export const encodeAccessToken = (username: string, userId: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('Environment variable JWT_SECRET is undefined');
    }

    if (!process.env.JWT_EXPIRES_IN) {
        throw new Error('Environment variable JWT_EXPIRES_IN is undefined');
    }

    const token = jwt.sign({
        username,
        userId,
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
};

// Decode the token and return the payload if it is valid, return false otherwise
export const decodeAccessToken = (token: string): IToken | false => {
    if (!process.env.JWT_SECRET) {
        throw new Error('Environment variable JWT_SECRET is undefined');
    }

    try {
        return jwt.verify(token, process.env.JWT_SECRET) as IToken;
    } catch (error) {
        return false;
    }
};


// Encode the username into a refresh token and return it
export const encodeRefreshToken = (username: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('Environment variable JWT_SECRET is undefined');
    }

    const token = jwt.sign(
        username,
        process.env.JWT_SECRET
    );

    return token;
};

// Return the username if the token is valid, otherwise return false
export const decodeRefreshToken = (token: string): string | false => {
    if (!process.env.JWT_SECRET) {
        throw new Error('Environment variable JWT_SECRET is undefined');
    }

    try {
        return jwt.verify(token, process.env.JWT_SECRET) as string;
    } catch (error) {
        return false;
    }
};

export default {
    encodeAccessToken,
    decodeAccessToken,
    encodeRefreshToken,
    decodeRefreshToken,
};
