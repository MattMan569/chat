import { Response, Request, NextFunction } from "express";

// A user is authorized if the session object is present on the request
export const isAuthorized = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.session.loggedIn) {
        res.status(401).json('You must be logged in to do that');
        return;
    }

    next();
};

export default isAuthorized;
