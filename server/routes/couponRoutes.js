import express from "express";
import {addCoupon, deactivateCoupon, deleteCoupon, getAllCoupon, activateCoupon} from "../controllers/coupon.controller.js";
import {isLoggedIn, authorize} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/create", isLoggedIn, authorize(['ADMIN','MODERATOR']), addCoupon);
router.put("/deactive/:id", isLoggedIn, authorize(['ADMIN','MODERATOR']), deactivateCoupon);
router.put("/activate/:id", isLoggedIn, authorize(['ADMIN','MODERATOR']), activateCoupon);
router.delete("/delete/:id",isLoggedIn, authorize(['ADMIN','MODERATOR']), deleteCoupon);
router.get("/get",isLoggedIn, getAllCoupon);

export default router;