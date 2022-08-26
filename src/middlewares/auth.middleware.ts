import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.model";

export const attachUserToResponse = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1]; //splits "Bearer token"
      //verify token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

      //get user from token
      const userFound = await User.findById(decoded.id).select("-password");
      if (userFound) {
        res.locals.user = userFound;
      } else {
        res.locals.user = false;
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }
  next();
});

export const protectRoute = asyncHandler(async (req, res, next) => {
  if (res.locals.user) {
    const user = await User.findById(res.locals.user._id);
    if (user?.isEmailVerified) {
      return next();
    }
    res.status(400).json({ message: "account verification pending" });
  } else {
    res
      .status(400)
      .json({ message: "must be signed in to perform this action" });
  }
});
export default { attachUserToResponse, protectRoute };
