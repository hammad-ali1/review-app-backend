import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TokenSchema = new Schema(
  {
    token: { type: String, required: true, unique: true },
    user: { type: String, required: true, unique: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("Token", TokenSchema);

export default Token;
