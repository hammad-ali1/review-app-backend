import mongoose, { Model } from "mongoose";
import Employee from "./Employee.model";
const Schema = mongoose.Schema;

//Types
export interface UserInterface extends GlobalTypes.User {
  //instance methods declarations
}
interface UserModelInterface extends Model<UserInterface> {
  //static method declarations
  getRatings: (_id: string) => Promise<any>;
}

const UserScehma = new Schema<GlobalTypes.User>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      validate: {
        validator: (email: string) =>
          new RegExp(
            "^[a-z0-9]{4}-[a-z]{3}-[0-9]{3}(@cuilahore.edu.pk)$",
            "i"
          ).test(email),
        message: "email does not match the cuilahore domain",
      },
      immutable: true,
    },
    name: { type: String, required: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

UserScehma.statics.getRatings = async (_id: string) => {
  const results = await Employee.aggregate([
    { $unwind: "$ratings" },
    { $match: { "ratings.user": new mongoose.Types.ObjectId(_id) } },
    {
      $group: {
        _id: "$_id",
        employeeName: { $first: "$name" },
        ratings: { $addToSet: "$ratings" },
      },
    },
  ]);
  return results;
};

const User = mongoose.model<UserInterface, UserModelInterface>(
  "User",
  UserScehma
);

export default User;
