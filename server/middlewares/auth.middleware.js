import User from "../models/user.schema.js";
import JWT from "jsonwebtoken";
import CustomError from "../utils/customError.js";
import config from "../config/index.js";
import asyncHandler from "../services/asyncHandler.js";

export const isLoggedIn = asyncHandler(async (req, _res, next) => {
  let token;

  if (
    req.cookies.token ||
    (req.header.authorization && req.header.authorization.startsWith("Bearer")) ||
    (req.header.Authorization && req.header.Authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.header.authorization.split(" ")[1] || req.header.Authorization.split(" ")[1];
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



export const authorize = (role)=> asyncHandler(async (req, _res, next) => {
  const roleArray =[...role].map(role=>role.trim().toUpperCase());
  if (roleArray.includes(req.user.role)) {
    next();
  }else{
    throw new CustomError("Not authorized to access this route", 401);
  }
});