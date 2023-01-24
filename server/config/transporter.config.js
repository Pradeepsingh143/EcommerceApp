import nodemailer from "nodemailer";
import config from "./index.js";
import { google } from "googleapis";

// create oAuth2Client
const oAuth2Client = new google.auth.OAuth2(
  config.GMAIL_CLIENT_ID,
  config.GMAIL_CLIENT_SECRET,
  config.GMAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: config.GMAIL_REFRESH_TOKEN });
const accessToken = await oAuth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'singhpardeep585@gmail.com',
    clientId: config.GMAIL_CLIENT_ID,
    clientSecret: config.GMAIL_CLIENT_SECRET,
    refreshToken: config.GMAIL_REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

export default transporter;
