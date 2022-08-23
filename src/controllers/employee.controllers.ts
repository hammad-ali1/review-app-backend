import asyncHandler from "express-async-handler";
import Employee from "../models/Employee.model";
import mongoose from "mongoose";

// Employee.find({ department: "630492c160e88e9012a67f42" }).then((employees) => {
//   employees.forEach((employee) => {
//     //@ts-ignore
//     employee.department = new mongoose.Types.ObjectId(
//       "630492c160e88e9012a67f42"
//     );
//     employee.save();
//   });
// });

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
