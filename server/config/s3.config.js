import AWS from "aws-sdk";
import config from "../config/index.js"

const s3 = new AWS.S3({
    accessKeyId: config.S3_ACCESS_KEY,
    secretAccessKey: config.S3_SECRET_KEY,
    region: config.S3_REGION
})

export default s3