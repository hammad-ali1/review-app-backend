import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

//Types
export interface EmployeeInterface extends GlobalTypes.Employee {
  // declare any instance methods here
}
interface EmployeeModelInterface extends Model<EmployeeInterface> {
  // declare any static methods here
  getEmployeesByDepartment(department: string): Promise<any>;
}

const EmployeeSchema = new Schema<GlobalTypes.Employee>({
  empId: { type: Number },
  imgURL: { type: String },
  namePrefix: { type: String },
  name: { type: String },
  subject: { type: String },
  designation: { type: String },
  department: { type: String, ref: "Employee" },
  qualifications: [
    {
      degree: { type: String },
      institute: { type: String },
      date: { type: String },
    },
  ],
  experience: [
    {
      designation: { type: String },
      institue: { type: String },
      date: { type: String },
    },
  ],
});

EmployeeSchema.statics.getEmployeesByDepartment = async function (
  department: string
) {
  return await this.aggregate([
    { $match: {} },
    {
      $group: {
        _id: "$department",
        employeeCount: { $sum: 1 },
        employees: { $addToSet: "$_id" },
      },
    },

    { $sort: { employeeCount: -1 } },
  ]);
};

const Employee = mongoose.model<EmployeeInterface, EmployeeModelInterface>(
  "Employee",
  EmployeeSchema
);

export default Employee;
