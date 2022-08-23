import asyncHandler from "express-async-handler";
import Department from "../models/Department.model";

export const getEmployeesByDepartment = asyncHandler(
  async (req, res): Promise<any> => {
    try {
      const { department } = req.query;
      if (!department)
        return res.status(400).json({ message: "department name is required" });
      const departmentExists = await Department.find({ name: department });
      if (!departmentExists)
        return res
          .status(404)
          .json({ message: "department name does not exists" });
      const departmentEmployees = await Department.getEmployeesByDepartment(
        "Physics"
      );
      return res.status(200).json({ results: departmentEmployees });
    } catch (err: any) {
      console.log(err.message);
      res
        .status(400)
        .json({ err: "Error occured in getting employees by department" });
    }
  }
);
