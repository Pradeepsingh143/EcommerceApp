import CollectionSchema from "../models/collection.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";

/***********************************************************
 * @createCollection
 * @Route http://localhost:4000/api/create/collection
 * @description create new collection
 * @parameter name
 * @returns success message, collection
 ***********************************************************/
export const createCollection = asyncHandler(async (req, res) => {
  const { name: collectionName } = req.body;

  if (!collectionName) {
    throw new CustomError("Collection name is required", 401);
  }

  const existCollection = await CollectionSchema.findOne({ name: collectionName });

  if (existCollection) {
    throw new CustomError("Collection name already exist in db", 401);
  }

  const collection = await CollectionSchema.create({
    name: collectionName,
  });

  res.status(200).json({
    success: true,
    message: "Collection created successfully",
    collection,
  });
});

/***********************************************************
 * @updateCollection
 * @Route http://localhost:4000/api/update/collection
 * @description update collection name
 * @parameter id: CollectionId
 * @returns success message, Updatedcollection
 ***********************************************************/
export const updateCollection = asyncHandler(async (req, res) => {
  const { name: collectionName } = req.body;
  const { id: collectionId } = req.params;

  if (!collectionName) {
    throw new CustomError("Collection name is required", 401);
  }

  const existCollection = await CollectionSchema.findOne({ name:collectionName });

  if (existCollection) {
    throw new CustomError("Collection name already exist in db", 401);
  }

  const updatedCollection = await CollectionSchema.findByIdAndUpdate(
    collectionId,
    { name: collectionName },
    { new: true, runValidators: true }
  );

  if (!updatedCollection) {
    throw new CustomError("Collection not found", 401);
  }

  res.status(200).json({
    success: true,
    message: "Collection updated successfully",
    updatedCollection,
  });
});

/***********************************************************
 * @deleteCollection
 * @Route http://localhost:4000/api/delete/collection
 * @description delete collection
 * @parameter id: CollectionId
 * @returns success message
 ***********************************************************/
export const deleteCollection = asyncHandler(async (req, res) => {
  const { id: collectionId } = req.params;

  let deletedCollection = await CollectionSchema.findByIdAndDelete({
    _id: collectionId
  });

  if (!deletedCollection) {
    throw new CustomError("Collection not found", 401);
  }

  deletedCollection = undefined;

  res.status(200).json({
    success: true,
    message: "Collection deleted successfully",
  });
});

/***********************************************************
 * @getAllCollections
 * @Route http://localhost:4000/api/collections
 * @description get all collection list
 * @parameter id: CollectionId
 * @returns success message
 ***********************************************************/
export const getAllCollections = asyncHandler(async (req, res) => {
  const collection = await CollectionSchema.find({});

  if (!collection) {
    throw new CustomError("Collections not found", 401);
  }

  res.status(200).json({
    success: true,
    message: "fetch collection list successfully",
    collection,
  });
});
