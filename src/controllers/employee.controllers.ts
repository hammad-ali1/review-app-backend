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
