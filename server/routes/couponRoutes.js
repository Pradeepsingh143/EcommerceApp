import express from "express";
import {addCoupon, deactivateCoupon, deleteCoupon, getAllCoupon} from "../controllers/coupon.controller.js";
import {isLoggedIn, authorize} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/create", isLoggedIn, authorize(['ADMIN','MODERATOR']), addCoupon);
router.put("/deactive/:id", isLoggedIn, authorize(['ADMIN','MODERATOR']), deactivateCoupon);
router.delete("/delete/:id",isLoggedIn, authorize(['ADMIN','MODERATOR']), deleteCoupon);
router.get("/get",isLoggedIn, getAllCoupon);

export default router;