import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

//Types
export interface UserInterface extends GlobalTypes.User {
  //instance methods declarations
}
interface UserModelInterface extends Model<UserInterface> {
  //static method declarations
}

const UserScehma = new Schema<GlobalTypes.User>({
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
});

const User = mongoose.model<UserInterface, UserModelInterface>(
  "User",
  UserScehma
);

export default User;
