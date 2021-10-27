export interface AuthData {
    username: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IMessage {
    author: string;
    message: string;
}
