import mongoose from "mongoose";
const { schema, model } = mongoose;

const couponSchema = schema(
  {
    code: {
      type: String,
      required: [true, "please provide coupon name"],
      unique: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true
  }
);

export default model("coupon", couponSchema)