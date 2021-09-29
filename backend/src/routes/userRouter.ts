import { Router } from "express";

import { createUser, loginUser, logoutUser } from "./controllers/userController";

export const userRouter = Router();

userRouter.post('/signup', createUser);

userRouter.post('/login', loginUser);

userRouter.post('/logout', logoutUser);

export default userRouter;
