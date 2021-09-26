import { Router } from "express";

import { createUser, loginUser } from "./controllers/userController";

export const userRouter = Router();

userRouter.post('/signup', createUser);

userRouter.post('/login', loginUser);

export default userRouter;
