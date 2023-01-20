import CollectionSchema from "../models/collection.schema";
import asyncHandler from "../services/asyncHandler";
import CustomError from "../utils/customError";


/***********************************************************
 * @createCollection
 * @Route http://localhost:4000/api/create/collection
 * @description user signup controller for creating a new user
 * @parameter name, email, password
 * @returns user object
 ***********************************************************/
export const createCollection = asyncHandler(async (req, res) => {
    const {name: collectionName} = req.body;

    if (!collectionName) {
        throw new CustomError("Collection name is required", 401);
    }

    const existCollection = await CollectionSchema.findOne({collectionName})

    if (existCollection) {
        throw new CustomError("Collection name already exist in db", 401);
    }

    const collection = await CollectionSchema.create({
        collectionName
    })
    
    res.status(200).json({
        success: true,
        message: "Collection created successfully",
        collection
    })
});

