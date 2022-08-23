import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

//Types
export interface DepartmentInterface extends GlobalTypes.Department {
  // declare any instance methods here
}
interface DepartmentModelInterface extends Model<DepartmentInterface> {
  // declare any static methods here
  getEmployeesByDepartment(department: string): Promise<any>;
}

const DepartmentSchema = new Schema<GlobalTypes.Department>(
  {
    _id: { type: String, unique: true },
    employeeCount: { type: Number },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  },
  { _id: false }
);

DepartmentSchema.statics.getEmployeesByDepartment = async function (
  department: string
) {
  return await this.aggregate([{ $match: {} }, { $group: { _id: "$_id" } }]);
};
const Department = mongoose.model<
  DepartmentInterface,
  DepartmentModelInterface
>("Department", DepartmentSchema);

export default Department;
