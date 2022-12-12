import mongoose from "mongoose";

const {schema, model} = mongoose

const collectionSchema = schema (
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