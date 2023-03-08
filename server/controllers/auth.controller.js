import User from "../models/user.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";
import cookieOptions from "../config/cookieOptions.js";
import mailHelper from "../utils/mailHelper.js";
import crypto from "crypto";
import config from "../config/index.js";
import JWT from "jsonwebtoken";

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
    throw new CustomError("Email already registered", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    throw new CustomError("!Failed, User not created", 400);
  }

  // const JwtToken = await user.getJwtToken('1d');

  // if (!JwtToken) {
  //   throw new CustomError("!Jwt failed to generate token", 400);
  // }

  user.password = undefined;

  // res.cookie("JwtToken", JwtToken, cookieOptions);

  return res.status(200).json({
    success: true,
    message: "User registered successfully",
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

  const user = await User.findOne({ email }, "_id name role password email");

  if (!user) {
    throw new CustomError("Invaild credentials", 400);
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (isPasswordMatched) {
    try {
      // refresh token for short period ex. 10min
      const accessToken = await user.getJwtToken(
        config.JWT_ACCESS_TOKEN_EXPIRY
      );
      // access token for long time ex. 2day
      const refreshToken = await user.getJwtToken(
        config.JWT_REFRESH_TOKEN_EXPIRY
      );
      console.log('refreshtoken: ',refreshToken);
      user.refreshToken = refreshToken;
      await user.save({validateBeforeSave:false});
      res.cookie("JwtToken", refreshToken, cookieOptions);
      user.password = undefined;
      return res.status(200).json({
        success: true,
        message: "User Logged in successfully",
        accessToken,
        user,
      });
    } catch (error) {
      throw new CustomError(`Something went wrong: ${error?.message}`, 400);
    }
  }
  throw new CustomError("Invaild credentials", 400);
});

/***********************************************************
 * @REFRESH_TOKEN
 * @Route http://localhost:4000/api/auth/refresh
 * @description generate new accesstoken using refresh token
 * @parameter token from cookies
 * @returns accesstoken
 ***********************************************************/
export const refreshToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  console.log("cookies: ", cookies);
  if (!cookies?.JwtToken) return res.sendStatus(401);
  const refreshToken = cookies.JwtToken;
  console.log("RefreshToken: ", refreshToken);
  // Is refreshToken in db?
  const user = await User.findOne({ refreshToken }, "_id role email name");
  if (!user) {
    res.clearCookie("JwtToken", cookieOptions);
    return res.status(405).json({
      success: false,
      message: "token invalid",
    });
  }

  let decodedJwtToken = JWT.verify(refreshToken, config.JWT_SECRET);

  if (!decodedJwtToken && decodedJwtToken?._id !== user?._id) {
    return res.status(403).json({
      success: false,
      message: "token invalid",
    });
  }

  // generate access token
  const accessToken = await user.getJwtToken(config.JWT_ACCESS_TOKEN_EXPIRY);

  if (!accessToken) return res.sendStatus(407);
  res.status(200).json({
    success: true,
    message: "access token generated",
    accessToken,
    role: user.role,
    user
  });
});

/***********************************************************
 * @LOGOUT
 * @Route http://localhost:4000/api/auth/logout
 * @description user logout clear user cookies
 * @parameter
 * @returns success message
 ***********************************************************/

export const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.JwtToken) {
    return res.sendStatus(204); //No content
  }
  const refreshToken = cookies.JwtToken;
  // Is refreshToken in db?
  const user = await User.findOne({ refreshToken }).exec();
  if (!user) {
    res.clearCookie("JwtToken", cookieOptions);
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  user.refreshToken = "";
  await user.save();
  res.clearCookie("JwtToken");
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

  const resetUrl = `${config.CLIENT_SIDE_URL}/password/reset/${resetToken}`;

  const mailMessage = `Reset your password \n\n Hi ${
    user.name
  }, \n We received your request to reset your ${
    config.CLIENT_SIDE_URL
  } account password.\n\n Please click the link below to reset it.\n\n
  ${resetUrl} \n\n This password reset link will expire at ${user.forgotPasswordExpiry.toLocaleString()}`;

  try {
    await mailHelper({
      email: user.email,
      subject: `[${config.CLIENT_SIDE_URL}] Password Reset`,
      text: mailMessage,
    });
    res.status(200).json({
      succes: true,
      message: `Email successfully sent to ${user.email}`,
    });
  } catch (error) {
    // remove forgotPasswordToken and forgotPasswordExpiry if code failed
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    throw new CustomError(
      `Error: ${error.message}` || "Email send failed",
      400
    );
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
  const { password, confirmPassword } = req.body;

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

  if (password !== confirmPassword) {
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
    message: "password reset successfully",
    user,
  });
});

/***********************************************************
 * @GET_PROFILE
 * @Route http://localhost:4000/api/auth/profile
 * @description check for token and populate req.user
 * @parameter
 * @returns user object
 ***********************************************************/
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.find({}).select("name email role createdAt");
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  res.status(200).json({
    succes: true,
    user,
  });
});

/***********************************************************
 * @CHANGE_PASSWORD
 * @Route http://localhost:4000/api/auth/password/change
 * @description change password only if user login and have old password
 * @parameter oldPassword, Password, confirmPassword
 * @returns user object
 ***********************************************************/
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, password, confirmPassword } = req.body;

  if (!(oldPassword && password && confirmPassword)) {
    throw new CustomError("All fields are required", 400);
  }

  if (password !== confirmPassword) {
    throw new CustomError("password doesn,t match", 400);
  }

  if (oldPassword === confirmPassword) {
    throw new CustomError(
      "New password must be different from old password",
      400
    );
  }

  const user = await User.findById(
    { _id: req.user._id },
    "email role password"
  );
  const comparePassword = await user.comparePassword(oldPassword);
  if (!comparePassword) {
    throw new CustomError("Old password is invaild", 400);
  }

  user.password = password;
  await user.save();
  user.password = undefined;
  const token = user.getJwtToken();

  // //helper method for cookie can be added
  res.cookie("token", token, cookieOptions);
  res.status(200).json({
    success: true,
    message: "password change successfully",
    user,
  });
});
