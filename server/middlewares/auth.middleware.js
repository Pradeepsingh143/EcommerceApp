import User from "../models/user.schema.js";
import JWT from "jsonwebtoken";
import CustomError from "../utils/customError.js";
import config from "../config/index.js";
import asyncHandler from "../services/asyncHandler.js";

export const isLoggedIn = asyncHandler(async (req, _res, next) => {
  let JwtToken;

  if (
    req.cookies?.JwtToken ||
    req.headers?.authorization ||
    req.headers?.Authorization
  ) {
    JwtToken = req.cookies?.JwtToken || req.headers?.authorization.split(" ")[1] || req.headers?.Authorization.split(" ")[1];
  }

  if (!JwtToken) {
    throw new CustomError("Not authorized to access this route please login first", 401);
  }

  try {
    const decodedJwtToken = JWT.verify(JwtToken, config.JWT_SECRET);
    req.user = await User.findById(decodedJwtToken._id, "name email role");
    next();
  } catch (error) {
    throw new CustomError("Token expired or invalid", 401);
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