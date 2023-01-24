import Order from "../models/order.schema.js";
import Product from "../models/product.schema.js";
import Coupon from "../models/coupon.schema.js";
import RazorPayInstance from "../config/razorpay.config.js";
import CustomError from "../utils/customError.js";
import asynHandler from "../services/asyncHandler.js";
import config from "../config/index.js";

/**********************************************************
 * @GENEARATE_RAZORPAY_ID
 * @route https://localhost:5000/api/order/razorpay
 * @description Controller used for generating razorpay Id
 * @description Creates a Razorpay Id which is used for placing order
 * @returns Order Object with "Razorpay order id generated successfully"
 *********************************************************/

export const generateRazorpayId = asynHandler(async (req, res) => {
  // get product and coupon from frontend
  const { products, coupon } = req.body;

  if (!products) {
    throw new CustomError("No product in your cart", 400);
  }

  const productsIds = products.map((product) => product._id);

  // verify product price from backend
  // make db query to get all product info

  try {
    const verifyProductDetails = await Product.find({
      _id: { $in: productsIds },
    });
    if (!verifyProductDetails) {
      throw new CustomError("Product not found", 400);
    }

    let finalAmount;

    //total amount and final amount
    const totalAmount = verifyProductDetails.reduce(
      (total, product) => (total + product.price, 0)
    );

    // coupon check - DB
    if (coupon) {
      const verifyCoupon = await Coupon.findById(coupon._id);
      if (!verifyCoupon) {
        throw new CustomError("Invalid Coupon", 400);
      }
      // calculate discount
      finalAmount = totalAmount - (totalAmount * verifyCoupon.discount) / 100;
    } else {
      finalAmount = totalAmount;
    }

    const options = {
      amount: Math.round(finalAmount * 100),
      currency: config.CURRENCY,
      receipt: `igniteshark${new Date().getTime()}`,
    };

    const order = await RazorPayInstance.orders.create(options);

    if (!order) {
      throw new CustomError("!Failed, payment not recived", 400);
    }

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.log(
      `Error finding products: ${error.message || "product not found"}`
    );
  }
});
