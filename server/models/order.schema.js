import mongoose from "mongoose";
const { Schema, model } = mongoose;
import OrderStatus from "../utils/orderStatus";

const orderSchema = Schema(
  {
    product: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true,
          },
          count: Number,
          price: Number,
        },
      ],
      reuqired: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    address: {
      type: String,
      reuqired: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    coupon: String,
    transactionId: String,
    status: {
      type: String,
      emum: Object.values(OrderStatus), // [ORDERED, SHIPPED, DELIVERED, CANCELLED]
      default: OrderStatus.ORDERED,
    },
  },
  {
    timestamps: true,
  }
);

export default model("order", orderSchema);
