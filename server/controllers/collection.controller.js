import CollectionSchema from "../models/collection.schema";
import asyncHandler from "../services/asyncHandler";
import CustomError from "../utils/customError";

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

  const existCollection = await CollectionSchema.findOne({ collectionName });

  if (existCollection) {
    throw new CustomError("Collection name already exist in db", 401);
  }

  const collection = await CollectionSchema.create({
    collectionName,
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

  const existCollection = await CollectionSchema.findOne({ collectionName });

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
    message: "Collection created successfully",
    updatedCollection,
  });
});

