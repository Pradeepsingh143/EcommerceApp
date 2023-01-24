import dotenv from "dotenv";
dotenv.config();

const config = {
  CURRENCY: process.env.CURRENCY || "INR",

  JWT_SECRET: process.env.JWT_SECRET || "badSecret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "10d",
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localHost",
  PORT: process.env.PORT || 4000,

  GMAIL_USER_EMAIL: process.env.GMAIL_USER_EMAIL,
  GMAIL_CLIENT_ID: process.env.GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET: process.env.GMAIL_CLIENT_SECRET,
  GMAIL_REDIRECT_URI: process.env.GMAIL_REDIRECT_URI,
  GMAIL_REFRESH_TOKEN: process.env.GMAIL_REFRESH_TOKEN,

  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  S3_REGION: process.env.S3_REGION,

  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
};

export default config;
