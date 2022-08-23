import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

//Types
export interface EmployeeInterface extends GlobalTypes.Employee {
  // declare any instance methods here
}
interface EmployeeModelInterface extends Model<EmployeeInterface> {
  // declare any static methods here
}

const EmployeeSchema = new Schema<GlobalTypes.Employee>({
  empId: { type: Number },
  imgURL: { type: String },
  namePrefix: { type: String },
  name: { type: String },
  subject: { type: String },
  designation: { type: String },
  department: { type: String, ref: "Department" },
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

const Employee = mongoose.model<EmployeeInterface, EmployeeModelInterface>(
  "Employee",
  EmployeeSchema
);

export default Employee;
