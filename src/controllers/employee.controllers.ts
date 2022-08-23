import asyncHandler from "express-async-handler";
import Employee from "../models/Employee.model";

import Department from "../models/Department.model";

Department.find().then(console.log);
// Employee.getEmployeesByDepartment("Physics").then(console.log);

export const getEmployees = asyncHandler(async (req, res) => {
  try {
    const { name } = req.query;
    const employees = await Employee.find({
      name: new RegExp(name as string),
    });
    res.status(200).json({ success: true, employees });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      err: err,
    });
  }
});
