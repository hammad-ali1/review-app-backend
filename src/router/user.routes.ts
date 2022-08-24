import { Router } from "express";

import { addUser, validateUser, getUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.route("/signup").post(addUser);
userRouter.route("/login").post(validateUser);
userRouter.route("/").get(getUser);

export default userRouter;
