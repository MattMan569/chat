export interface IToken {
    username: string;
    // Issued at
    iat: number;
    // Expiry time
    exp: number;
}

export interface IUser {
    id: string;
    username: string;
    password: string;
}

export interface IAuth {
    _id: string;
    userId: string;
    refreshToken: string;
}

// Extend express's session
declare module 'express' {
    interface Request {
        session?: IToken;
    }
}
