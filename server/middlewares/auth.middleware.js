import User from "../models/user.schema";
import JWT from "jsonwebtoken";
import CustomError from "../utils/customError";
import config from "../config/index";
import asyncHandler from "../services/asyncHandler";

export const isLoggedIn = asyncHandler(async (req, _res, next) => {
  let token;

  if (
    req.cookies.token ||
    (req.header.authorization && req.header.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.header.authorization.split(" ")[1];
  }

  if (!token) {
    throw new CustomError("Not authorized to access this route", 401);
  }

  try {
    const decodedJwtToken = JWT.verify(token, config.JWT_SECRET);
    req.user = await User.findById(decodedJwtToken._id, "name email role");
    next();
  } catch (error) {
    throw new CustomError("Not authorized to access this route", 401);
  }
});
