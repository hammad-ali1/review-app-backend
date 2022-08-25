import { Router } from "express";

import {
  addUser,
  validateUser,
  getUser,
  sendVerificationEmail,
  verifyLink,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.route("/signup").post(addUser);
userRouter.route("/login").post(validateUser);
userRouter.route("/").get(getUser);
userRouter.route("/verify").post(sendVerificationEmail);
userRouter.route("/verify/:user/:token").get(verifyLink);
export default userRouter;
