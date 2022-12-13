import User from "../models/user.schema";
import asyncHandler from "../services/asyncHandler";
import CustomError from "../utils/customError";
import cookieOptions from "../utils/cookieOptions";
import mailHelper from "../utils/mailHelper";
import crypto from "crypto";

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

  const token = user.getJwtToken();
  console.log(user);
  user.password = undefined;

  res.cookies("token", token, cookieOptions);
  return res.status(200).json({
    success: true,
    token,
    user,
  });
});

/***********************************************************
 * @LOGIN
 * @Route http://localhost:4000/api/auth/login
 * @description user login controller for auth a user
 * @parameter  email, password
 * @returns user object
 ***********************************************************/

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    throw new CustomError("All fields are required", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomError("Invaild credentials", 400);
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (isPasswordMatched) {
    const token = user.getJwtToken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      success: true,
      token,
      user,
    });
  }

  throw new CustomError("Invaild credentials", 400);
});

/***********************************************************
 * @LOGOUT
 * @Route http://localhost:4000/api/auth/logout
 * @description user logout clear user cookies
 * @parameter
 * @returns success message
 ***********************************************************/

export const logout = asyncHandler(async (_req, res) => {
  // Also can use {res.clearCookie("token")}
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out",
  });
});

/***********************************************************
 * @FORGOT_PASSWORD
 * @Route http://localhost:4000/api/auth/password/forgot
 * @description forgot password send an token
 * @parameter email
 * @returns success message -send email
 ***********************************************************/

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("user not found", 400);
  }
  const resetToken = user.generateForgotPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.header(
    "host"
  )}/api/auth/password/reset/${resetToken}`;

  const mailMessage = `Your password reset url is \n\n ${resetUrl} \n\n`;

  try {
    await mailHelper({
      email: user.email,
      subject: `Reset password mail for ${req.hostname}`,
      text: mailMessage,
    });
    res.status(200).json({
      succes: true,
      message: `Email send to ${user.email}`,
    });
  } catch (error) {
    // remove forgotPasswordToken and forgotPasswordExpiry if code failed
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    user.save({ validateBeforeSave: false });
    throw new CustomError(error.message || "Email send failed", 400);
  }
});

/***********************************************************
 * @RESET_PASSWORD
 * @Route http://localhost:4000/api/auth/password/reset/:resetToken
 * @description User will be able to reset password based on url token
 * @parameter token from url, password and confirmPassword
 * @returns user object
 ***********************************************************/

export const resetPassword = asyncHandler(async (req, res) => {
  const { token: resetToken } = req.params;
  const { password, comfirmPassword } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: resetPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new CustomError("password token is invaild or expired", 400);
  }

  if (password !== comfirmPassword) {
    throw new CustomError("password doesn,t match", 400);
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  //create token and send as response to user
  const token = user.getJwtToken();
  user.password = undefined;

  //helper method for cookie can be added
  res.cookie("token", token, cookieOptions);
  res.status(200).json({
    success: true,
    user,
  });
});
