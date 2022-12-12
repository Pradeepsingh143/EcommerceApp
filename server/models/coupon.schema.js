import mongoose from "mongoose";
const { schema, model } = mongoose;

const couponSchema = schema(
  {
    code: {
      type: String,
      reuqired: [true, "please provide coupon name"],
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