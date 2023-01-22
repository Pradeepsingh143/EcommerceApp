import mongoose from "mongoose";

const {Schema, model} = mongoose

const collectionSchema = Schema (
    {
        name : {
            type : String,
            required : [true, "Please provide a category name"],
            trim : true,
            maxLength : [130, "collection name should not be more than 130 characters"],
        },

    }
)

export default model('collection', collectionSchema)