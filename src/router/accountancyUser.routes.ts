import { Router } from "express";

import { addUser, logInUser } from "../controllers/accountancyUser.controller";
const accountancyUserRouter = Router();

accountancyUserRouter.route("/signup").post(addUser);
accountancyUserRouter.route("/login").post(logInUser);

export default accountancyUserRouter;
