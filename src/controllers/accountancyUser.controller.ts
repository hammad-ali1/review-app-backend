import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import sendMessage from "../utils/mailer";
import AccountancyUser from "../models/AccountancyUser.model";

export const addUser = asyncHandler(async (req, res): Promise<any> => {
  const user: GlobalTypes.AccountancyUser = req.body;
  if (!user.userName)
    return res.status(400).json({ msg: "provide all user fields" });
  try {
    const userExists = await AccountancyUser.findOne({
      userName: user.userName,
    });
    if (userExists)
      return res.status(400).json({ message: "user already in use" });
    const newUser = await AccountancyUser.create({
      ...user,
    });
    return res.status(200).json({ user: newUser });
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: "error occured while signing up" });
  }
});

export const logInUser = asyncHandler(async (req, res): Promise<any> => {
  try {
    const { username, password } = req.body;
    const userFound = await AccountancyUser.findOne({ userName: username });

    if (userFound && password === userFound.password) {
      //send otp code
      var authCode = Math.floor(1000 + Math.random() * 9000);
      const html = `<p> your auth code is ${authCode}</p>`;
      sendMessage(userFound.email, "Two factor auth", html);
      userFound.authCode = authCode.toString();
      return res.status(200).json({
        user: userFound,
      });
    } else {
      return res.status(404).json({ message: "username or password is wrong" });
    }
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: "error occured while logging in" });
  }
});

export const getAllUsers = asyncHandler(async (req, res): Promise<any> => {
  try {
    const { _id } = req.body;
    const userFound = await AccountancyUser.findById(_id);

    if (userFound && userFound.isAdmin) {
      const allUsers = await AccountancyUser.find({});
      return res.status(200).json(allUsers);
    } else {
      return res.status(404).json({ message: "not an admin account" });
    }
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: "error occured while getting users" });
  }
});

export const deleteUser = asyncHandler(async (req, res): Promise<any> => {
  try {
    const { userName } = req.body;
    const userFound = await AccountancyUser.deleteOne({ userName });

    if (userFound) {
      return res.status(200).json({ message: "success" });
    } else {
      return res.status(404).json({ message: "not found" });
    }
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: "error occured " });
  }
});

// export const getUser = asyncHandler(async (req, res): Promise<any> => {
//   try {
//     const { token } = req.query;
//     const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET!);
//     const user = await AccountancyUser.findById(decoded.id).select("-password");
//     if (user) return res.status(200).json(user);
//     else return res.status(400).json({ message: "token is invalid" });
//   } catch (err: any) {
//     console.log(err.message);
//     res.status(400).json({ message: "error occured while getting user" });
//   }
// });

/*
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
*/
