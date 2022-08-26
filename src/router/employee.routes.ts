import { Router } from "express";
import {
  getEmployees,
  getEmployeeById,
  addRating,
} from "../controllers/employee.controllers";
import { protectRoute } from "../middlewares/auth.middleware";

const employeeRouter = Router();

employeeRouter.route("/").get(getEmployees);
employeeRouter.route("/:id").get(getEmployeeById);
employeeRouter.route("/ratings").post(protectRoute, addRating);

export default employeeRouter;
