import dotenv from 'dotenv'
dotenv.config()

const {
    JWT_SECRET,
    JWT_EXPIRY,
    MONGODB_URL,
    PORT,
    SMPT_MAIL_HOST,
    SMPT_MAIL_PORT,
    SMPT_MAIL_USER,
    SMPT_MAIL_PASS,
    SMPT_MAIL_EMAIL

} = process.env

const config = {
    JWT_SECRET : JWT_SECRET,
    JWT_EXPIRY : JWT_EXPIRY || "10d",
    MONGODB_URL : MONGODB_URL || "mongodb://localHost",
    PORT : PORT || 4000,
    SMPT_MAIL_HOST: SMPT_MAIL_HOST,
    SMPT_MAIL_PORT: SMPT_MAIL_PORT,
    SMPT_MAIL_USER: SMPT_MAIL_USER,
    SMPT_MAIL_PASS: SMPT_MAIL_PASS,
    SMPT_MAIL_EMAIL: SMPT_MAIL_EMAIL
}

export default config