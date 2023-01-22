import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a product name"],
      trim: true,
      maxLength: [130, "product name should be a max of 130 char"],
    },
    price: {
      type: Number,
      required: [true, "please provide a product price"],
      maxLength: [5, "product price should not be more than 5 digits"],
    },
    description: {
      type: String,
      // use editor form to design product description
    },
    photos: [
      {
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "collection",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("product", productSchema);
