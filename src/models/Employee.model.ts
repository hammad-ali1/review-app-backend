import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

const RatingSchema = new Schema<GlobalTypes.Rating>(
  {
    value: { type: Number, required: true, min: 0.5, max: 5 },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);
//Types
export interface EmployeeInterface extends GlobalTypes.Employee {
  // declare any instance methods here
}
interface EmployeeModelInterface extends Model<EmployeeInterface> {
  addRating: (_id: string, rating: GlobalTypes.Rating) => Promise<any>;
  getEmployeeWithAverageRating: (_id: string) => Promise<any>;
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
  ratings: { type: [RatingSchema], default: [] },
});

EmployeeSchema.statics.addRating = async function (
  _id: string,
  rating: GlobalTypes.Rating
) {
  const isRatingAlreadyGiven = await Employee.findOne({
    _id: _id,
    ratings: { $elemMatch: { user: rating.user } },
  });
  if (isRatingAlreadyGiven) {
    return "Rating already given by this user";
  }
  const result = await Employee.findOneAndUpdate(
    { _id },
    { $addToSet: { ratings: rating } }
  );

  if (!result) return "Could not update emoloyee ratings";
  return "Rating recorded successfully";
};

EmployeeSchema.statics.getEmployeeWithAverageRating = async function (
  objectId: string
) {
  const results = await Employee.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(objectId) },
    },
    {
      $addFields: {
        averageRating: { $avg: "$ratings.value" },
      },
    },
    // {
    //   $lookup: {
    //     from: "users",
    //     localField: "ratings.user",
    //     foreignField: "_id",
    //     as: "users",
    //   },
    // },
    // { $unwind: "$users" },
  ]);
  return results[0];
};

const Employee = mongoose.model<EmployeeInterface, EmployeeModelInterface>(
  "Employee",
  EmployeeSchema
);

export default Employee;
