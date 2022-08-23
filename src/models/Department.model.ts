import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

//Types
export interface DepartmentInterface extends GlobalTypes.Department {
  // declare any instance methods here
}
interface DepartmentModelInterface extends Model<DepartmentInterface> {
  // declare any static methods here
  getEmployeesByDepartment(department?: string): Promise<any>;
}

const DepartmentSchema = new Schema<GlobalTypes.Department>({
  name: { type: String, unique: true },
  employeeCount: { type: Number },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
});

DepartmentSchema.statics.getEmployeesByDepartment = async function (
  department: string
) {
  return await this.aggregate([
    { $match: department ? { name: department } : {} },
    { $group: { _id: "$name" } },
    {
      $lookup: {
        from: "employees",
        localField: "_id",
        foreignField: "department",
        as: "employees",
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        employees: "$employees",
      },
    },
  ]);
};
const Department = mongoose.model<
  DepartmentInterface,
  DepartmentModelInterface
>("Department", DepartmentSchema);

export default Department;
