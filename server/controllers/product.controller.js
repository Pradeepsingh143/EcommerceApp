import Product from "../models/product.schema.js";
import formidable from "formidable";
import fs from "fs";
import { s3DeleteFile, s3FileUpload } from "../services/s3.files";
import Mongoose from "mongoose";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";
import config from "../config.js";

/***********************************************************
 * @createProduct
 * @Route http://localhost:4000/api/product/create
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

      // generate productId from Mongoose
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

      // create an imageArray variable and assign imageArrayResponse
      const imageArray = await imageArrayResponse;

      // create product in db
      const product = await Product.create({
        _id: productID,
        photos: imageArray,
        ...fields,
      });

      // if product not created
      if (!product) {
        // * if product got error while creating then delete all images from AWS s3 bucket
        Promise.all(
          imageArray.map(async (_file, index) => {
            await s3DeleteFile({
              bucketName: config.S3_BUCKET_NAME,
              key: imageArray[index],
            });
          })
        );
        throw new CustomError("product was not created", 400);
      }

      //  back response
      res.status(200).json({
        success: true,
        message: "product was create successfully",
        product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message || "something went wrong product was not created",
      });
    }
  });
});

/***********************************************************
 * @updateProduct
 * @Route http://localhost:4000/api/product/update/:id
 * @description update product
 * @parameter name, price, description, photos, stock, sold, collectionId
 * @returns success message, product object
 ***********************************************************/

// need to work in this controller
export const updateProduct = asyncHandler(async (req, res) => {
  const { id: productID } = req.params;

  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async function (err, fields, files) {
    try {
      if (err) {
        throw new CustomError(err.message || "something went wrong", 500);
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

      // create an imageArray variable and assign imageArrayResponse
      const imageArray = await imageArrayResponse;

      const updatedFields = {};
      Object.keys(fields).forEach((key) => {
        if (fields[key]) {
          updatedFields[key] = fields[key];
        }
      });

      // create product in db
      const updatedProduct = await Product.findByIdAndUpdate(
        productID,
        {
          photos: imageArray,
          ...updatedFields,
        },
        {runValidators: false, new: true}
      );

      // if product not created
      if (!updatedProduct) {
        // * if product got error while creating then delete all images from AWS s3 bucket
        Promise.all(
          imageArray.map(async (_file, index) => {
            await s3DeleteFile({
              bucketName: config.S3_BUCKET_NAME,
              key: imageArray[index],
            });
          })
        );
        throw new CustomError("product was not created", 400);
      }

      //  back response
      res.status(200).json({
        success: true,
        message: "product was create successfully",
        updatedProduct,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message || "something went wrong product was not created",
      });
    }
  });
});

/***********************************************************
 * @delteProduct
 * @Route http://localhost:4000/api/product/delete/:id
 * @description delete product
 * @parameter id
 * @returns success message, product object
 ***********************************************************/
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError("Product id is required", 400);
  }
  let product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new CustomError("Product not found", 400);
  }

  product = undefined;

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

/***********************************************************
 * @getAllProducts
 * @Route http://localhost:4000/api/product/get
 * @description get all product list
 * @parameter
 * @returns success message, product object
 ***********************************************************/
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    throw new CustomError("No product found", 404);
  }

  res.status(200).json({
    success: true,
    message: "all product fetched successfully",
    products,
  });
});

/***********************************************************
 * @getProductsById
 * @Route http://localhost:4000/api/product/get/:id
 * @description get all product list
 * @parameter
 * @returns success message, product object
 ***********************************************************/
export const getProductById = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "all product fetched successfully",
    product,
  });
});
