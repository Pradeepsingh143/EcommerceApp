import Product from "../models/product.schema";
import formidable from "formidable";
import fs from "fs";
import { s3DeleteFile, s3FileUpload } from "../services/s3.files";
import Mongoose from "mongoose";
import asyncHandler from "../services/asyncHandler";
import CustomError from "../utils/customError";
import config from "../config";

/***********************************************************
 * @createProduct
 * @Route http://localhost:4000/api/product
 * @description create new product
 * @parameter name, price, description, photos, stock, sold, collectionId
 * @returns success message, product object
 ***********************************************************/

export const addProduct = asyncHandler(async (req, res) => {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async function (err, fields, files) {
    try {
      if (err) {
        throw new CustomError(err.message || "something went wrong", 500);
      }

      let productID = new Mongoose.Types.ObjectId().toHexString();

      // check fields
      if (
        !fields.name ||
        !fields.price ||
        !fields.description ||
        !fields.collectionId ||
        !fields.stock
      ) {
        throw new CustomError("please fill all details", 500);
      }

      // handling images
      let imageArrayResponse = Promise.all(
        Object.keys(files).map(async (filekey, index) => {
          const element = files[filekey];

          const data = fs.readFileSync(element.filepath);

          const upload = await s3FileUpload({
            bucketName: config.S3_BUCKET_NAME,
            key: `products/${productID}/photos_${index + 1}.png`,
            body: data,
            contentType: element.mimetype,
          });
          return {
            secure_url: upload.Location,
          };
        })
      );

      const imageArray = await imageArrayResponse;

      const product = await Product.create({
        _id: productID,
        photos: imageArray,
        ...fields,
      });

      if (!product) {
        throw new CustomError("product was not created", 400);
      }

      // send back response
      res.status(200).json({
        success: true,
        message: "product was create successfully",
        product
      })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong product was not created"
          })
    }
  });
});
