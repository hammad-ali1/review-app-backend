import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

//Types
export interface UserInterface extends GlobalTypes.AccountancyUser {
  //instance methods declarations
}
interface UserModelInterface extends Model<UserInterface> {
  //static method declarations
  getRatings: (_id: string) => Promise<any>;
}

const UserScehma = new Schema<GlobalTypes.AccountancyUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      immutable: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    authCode: { type: String, default: "" },
    businessName: { type: String, required: true },
    title: { type: String, required: true },
    DOB: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const AccountancyUser = mongoose.model<UserInterface, UserModelInterface>(
  "AccountancyUser",
  UserScehma
);

export default AccountancyUser;
