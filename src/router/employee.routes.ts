import { Router } from "express";
import {
  getEmployees,
  getEmployeeById,
} from "../controllers/employee.controllers";

const employeeRouter = Router();

employeeRouter.route("/").get(getEmployees);
employeeRouter.route("/:id").get(getEmployeeById);

export default employeeRouter;
