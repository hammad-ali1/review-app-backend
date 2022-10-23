import { Router } from "express";

import {
  addUser,
  logInUser,
  getAllUsers,
  deleteUser,
  sendResetEmail,
  updatePassword,
  updateUser,
} from "../controllers/accountancyUser.controller";
const accountancyUserRouter = Router();

accountancyUserRouter.route("/edit").post(updateUser);
accountancyUserRouter.route("/signup").post(addUser);
accountancyUserRouter.route("/login").post(logInUser);
accountancyUserRouter.route("/all").post(getAllUsers);
accountancyUserRouter.route("/delete").post(deleteUser);
accountancyUserRouter.route("/reset/:user").get(sendResetEmail);
accountancyUserRouter.route("/newpassword").post(updatePassword);

export default accountancyUserRouter;
