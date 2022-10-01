import { Router } from "express";

import {
  addUser,
  logInUser,
  getAllUsers,
  deleteUser,
} from "../controllers/accountancyUser.controller";
const accountancyUserRouter = Router();

accountancyUserRouter.route("/signup").post(addUser);
accountancyUserRouter.route("/login").post(logInUser);
accountancyUserRouter.route("/all").post(getAllUsers);
accountancyUserRouter.route("/delete").post(deleteUser);

export default accountancyUserRouter;
