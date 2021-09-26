export interface IUser {
    id: string;
    username: string;
    password: string;
}


declare module 'express-session' {
    interface SessionData {
        userId: string;
        username: string;
        loggedIn: boolean;
    }
}
