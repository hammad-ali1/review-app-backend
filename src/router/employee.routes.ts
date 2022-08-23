import { Router } from "express";
import { getEmployees } from "../controllers/employee.controllers";

const employeeRouter = Router();

employeeRouter.route("/").get(getEmployees);

export default employeeRouter;
