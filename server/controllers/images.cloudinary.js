import asyncHandler from "../services/asyncHandler.js";
import {
  cloudinaryFileDelete,
  cloudinaryFileUpload,
  cloudinaryResources,
} from "../services/cloudinary.files.js";
import formidable from "formidable";
import cloudinary from "../config/cloudinary.config.js";

export const getAllImages = asyncHandler(async (req, res) => {
  try {
    const result = await cloudinaryResources({
      width: 250,
      height: 250,
      max_results: 100
    });
    const resources = result.resources.map(resource => {
        resource.resized_url = cloudinary.url(resource.public_id, { width: 250, height: 250 });
        return resource;
      });
  
    res.status(200).json({
      success: true,
      message: "fetch images successfully",
      resources,
    });
  } catch (error) {
    console.log(error);
  }
});

export const deleteImage = asyncHandler(async (req, res) => {
  try {
    const { id } = req.query;
    console.log("delete id:", id);
    await cloudinaryFileDelete(id);
    res.status(200).json({
      success: true,
      message: "image deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

export const uploadImage = asyncHandler(async (req, res) => {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async function (err, _fields, files) {
    try {
      if (err) {
        throw new CustomError(err.message || "something went wrong", 500);
      }
      // product gallery image
      let fileArray;

      if (!Array.isArray(files?.uploadFiles)) {
        fileArray = [files.uploadFiles];
      } else {
        fileArray = files?.uploadFiles;
      }

      const images = Promise.all(
        fileArray.map(async (file, i) => {
          const data = await cloudinaryFileUpload(file?.filepath, {
            folder: "upload",
          });
          return data;
        })
      );

      const imageData = await images;

      const imageArray = imageData.map((data) => {
        return {
          secure_url: data?.secure_url,
          public_id: data?.public_id,
        };
      });

      //  back response
      res.status(200).json({
        success: true,
        message: "product was create successfully",
        imageArray,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "image doesn't upladed",
      });
    }
  });
});
