import dotenv from 'dotenv'
dotenv.config()

const {
    JWT_SECRET,
    JWT_EXPIRY,
} = process.env

const config = {
    JWT_SECRET : JWT_SECRET,
    JWT_EXPIRY : JWT_EXPIRY || "10d",
}

export default config