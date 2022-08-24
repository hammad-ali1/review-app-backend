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
      next();
    } catch (err: any) {
      console.log(err.message);
    }
  }
  next();
});

export default { attachUserToResponse };
