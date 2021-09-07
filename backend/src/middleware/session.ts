import { Request, Response, NextFunction } from "express";
import jwtUtil from "../util/jwt";

export const session = (req: Request, res: Response, next: NextFunction): void => {
    // Remove the bearer portion of the token
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        next();
        return;
    }

    const payload = jwtUtil.decodeAccessToken(token);

    // Invalid token
    if (!payload) {
        next();
        return;
    }

    req.session = payload;
    next();
};

export default session;
