import dotenv from 'dotenv'
dotenv.config()

const {
    JWT_SECRET,
    JWT_EXPIRY,
    MONGODB_URL,
    PORT
} = process.env

const config = {
    JWT_SECRET : JWT_SECRET,
    JWT_EXPIRY : JWT_EXPIRY || "10d",
    MONGODB_URL : MONGODB_URL || "mongodb://localHost",
    PORT : PORT || 4000
}

export default config