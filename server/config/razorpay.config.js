import Razorpay from "razorpay";
import config from "./index";

const RazorPayInstance = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_KEY_SECRET,
});


export default RazorPayInstance