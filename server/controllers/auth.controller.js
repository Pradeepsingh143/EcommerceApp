import User from "../models/user.schema";
import asyncHandler from "../services/asyncHandler";
import CustomError from "../utils/customError";
import cookieOptions from '../utils/cookieOptions'

/***********************************************************
 * @SIGNUP
 * @Route http://localhost:4000/api/auth/signup
 * @description user signup controller for creating a new user
 * @parameter name, email, password
 * @returns user object
 ***********************************************************/

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check all feild are passed if not throw an error
  if (!(name && email && password)) {
    throw new CustomError("All fields are required", 400);
  }

  // check if users already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new CustomError("User already exists", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.getJwtToken()
  console.log(user);
  user.password = undefined;

  res.cookies("token", token, cookieOptions)
  res.status(200).json({
    success: true,
    token,
    user
  })

});
