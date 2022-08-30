import { Router } from "express";

import {
  addUser,
  validateUser,
  getUser,
  sendVerificationEmail,
  verifyLink,
  getRatingsGiven,
} from "../controllers/user.controller";
import { protectRoute } from "../middlewares/auth.middleware";
const userRouter = Router();

userRouter.route("/signup").post(addUser);
userRouter.route("/login").post(validateUser);
userRouter.route("/").get(getUser);
userRouter.route("/verify").post(sendVerificationEmail);
userRouter.route("/verify/:user/:token").get(verifyLink);
userRouter.route("/ratings").get(protectRoute, getRatingsGiven);

export default userRouter;
