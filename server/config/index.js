import dotenv from 'dotenv'
dotenv.config()

const config = {
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_EXPIRY : process.env.JWT_EXPIRY || "10d",
    MONGODB_URL : process.env.MONGODB_URL || "mongodb://localHost",
    PORT : process.env.PORT || 4000,
    
    SMPT_MAIL_HOST: process.env.SMPT_MAIL_HOST,
    SMPT_MAIL_PORT: process.env.SMPT_MAIL_PORT,
    SMPT_MAIL_USER: process.env.SMPT_MAIL_USER,
    SMPT_MAIL_PASS: process.env.SMPT_MAIL_PASS,
    SMPT_MAIL_EMAIL: process.env.SMPT_MAIL_EMAIL,

    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_REGION: process.env.S3_REGION,
}

export default config