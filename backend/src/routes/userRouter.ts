import { Router } from "express";

import { createUser, loginUser, logoutUser, validateUser } from "./controllers/userController";

export const userRouter = Router();

userRouter.post('/signup', createUser);

userRouter.post('/login', loginUser);

userRouter.post('/logout', logoutUser);

userRouter.get('/validate', validateUser);

export default userRouter;
