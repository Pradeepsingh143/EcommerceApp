import express from "express";
import {addCoupon, deactivateCoupon, deleteCoupon, getAllCoupon} from "../controllers/coupon.controller.js";
import {isLoggedIn, isAdmin} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/create", isLoggedIn, isAdmin, addCoupon);
router.put("/deactive/:id", isLoggedIn, isAdmin, deactivateCoupon);
router.delete("/delete/:id",isLoggedIn, isAdmin, deleteCoupon);
router.get("/get",isLoggedIn, getAllCoupon);

export default router;