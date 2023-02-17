import cloudinary from "../config/cloudinary.config.js";

export const cloudinaryFileUpload = async (file, option) => {
  return await cloudinary.uploader.upload(file, option);
};

export const cloudinaryFileDelete = async (id) => {
  return await cloudinary.uploader.destroy(id);
};

export const cloudinaryResources = async (option) => {
  return await cloudinary.api.resources(option);
};
