import asyncHandler from "express-async-handler";
import Employee from "../models/Employee.model";

export const getEmployees = asyncHandler(async (req, res): Promise<any> => {
  try {
    const { name } = req.query;
    if (!name)
      return res
        .status(400)
        .json({ message: "Name is a required query parameter" });
    const employees = await Employee.find({
      name: { $regex: new RegExp(name as string, "i") },
    });
    res.status(200).json({ results: employees });
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({
      success: false,
    });
  }
});

export const getEmployeeById = asyncHandler(async (req, res): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ message: "employee id is required in params" });
    const employee = await Employee.getEmployeeWithAverageRating(id);
    if (employee) {
      return res.status(200).json(employee);
    } else {
      return res.status(404).json({ message: "Employee not found" });
    }
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: "error occured in database" });
  }
});

export const addRating = asyncHandler(async (req, res): Promise<any> => {
  try {
    const { employeeId, ratingValue } = req.body;
    if (!employeeId || !ratingValue)
      return res
        .status(400)
        .json({ message: "provide employeeId and ratingValue" });
    const result = await Employee.addRating(employeeId, {
      value: ratingValue,
      user: res.locals.user._id,
    });
    res.status(200).json({ message: result });
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: "error occured while adding new rating" });
  }
});
