import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.model";

export const addUser = asyncHandler(async (req, res): Promise<any> => {
  const { email, name, password } = req.body;
  try {
    if (!email || !name || !password)
      return res
        .status(400)
        .json({ message: "provide all fields to add user" });
    const userExists = await User.findOne({ email }).select("-password");
    if (userExists)
      return res.status(400).json({ message: "email already in use" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });
    const token = generateToken(newUser._id.toString());
    return res.status(200).json({ token, user: newUser });
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: "error occured while signing up" });
  }
});

export const validateUser = asyncHandler(async (req, res): Promise<any> => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (userFound && (await bcrypt.compare(password, userFound.password))) {
      const userWithoutPassword = {
        name: userFound.name,
        email: userFound.email,
        isEmailVerified: userFound.isEmailVerified,
      };
      return res
        .status(200)
        .json({
          token: generateToken(userFound._id.toString()),
          user: userWithoutPassword,
        });
    } else {
      return res.status(404).json({ message: "email or password is wrong" });
    }
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: "error occured while logging in" });
  }
});

export const getUser = asyncHandler(async (req, res): Promise<any> => {
  try {
    const { token } = req.query;
    const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id).select("-password");
    if (user) return res.status(200).json(user);
    else return res.status(400).json({ message: "token is invalid" });
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: "error occured while getting user" });
  }
});
//generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "20d" });
};
