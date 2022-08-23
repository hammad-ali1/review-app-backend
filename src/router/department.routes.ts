import { Router } from "express";
import { getEmployeesByDepartment } from "../controllers/department.controllers";
const departmentRouter = Router();

departmentRouter.route("/").get(getEmployeesByDepartment);

export default departmentRouter;
