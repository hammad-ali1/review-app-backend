import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.model";
import TokenModel from "../models/Token.model";
import crypto from "crypto";
import sendMessage from "../utils/mailer";

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
        _id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        isEmailVerified: userFound.isEmailVerified,
      };
      return res.status(200).json({
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

export const sendVerificationEmail = asyncHandler(
  async (req, res): Promise<any> => {
    try {
      const { _id } = req.body;
      const userFound = await User.findById(_id);
      if (!userFound)
        return res.status(400).json({ message: "ivalid user id" });
      const token = crypto.randomBytes(64).toString("hex");
      const user = userFound._id;
      const tokenObject = await TokenModel.findOneAndUpdate(
        { user },
        { token, user },
        { upsert: true }
      );
      const link = `${process.env.BASE_URL}/users/verify/${user}/${token}`;
      const html = `<p> Click this <a href=${link}>link</a> to verify your account</p>`;
      sendMessage(userFound.email, "Verify your email", html);
      return res.status(200).json({ message: "verification email sent " });
    } catch (err: any) {
      console.log(err.message);
      res
        .status(400)
        .json({ message: "an error occured while sending verification link" });
    }
  }
);

export const verifyLink = asyncHandler(async (req, res): Promise<any> => {
  const { user, token } = req.params;
  const tokenObject = await TokenModel.findOne({ user: user });
  if (!tokenObject) return res.status(400).send("<h1>Invalid Link</h1>");
  if (tokenObject.token === token) {
    const updateResult = await User.findByIdAndUpdate(
      { _id: user },
      { isEmailVerified: true }
    );
    if (updateResult) return res.status(200).send("<h1>Email Verified</h1>");
  }
  res.status(400).send("<h1>Invalid link </h1>");
});

export const getRatingsGiven = asyncHandler(async (req, res): Promise<any> => {
  try {
    const { userid } = req.query;
    if (!userid)
      return res
        .status(400)
        .json({ message: "userid is a required query param" });
    const results = await User.getRatings(userid as string);
    res.status(200).json(results);
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({
      message: "an error occured while getting ratings given by user",
    });
  }
});

//generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "20d" });
};
