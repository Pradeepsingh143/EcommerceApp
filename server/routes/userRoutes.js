import express from "express";
const router = express.Router();
import { isLoggedIn, authorize } from "../middlewares/auth.middleware.js";
import {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getProfile,
  changePassword,
  refreshToken,
} from "../controllers/auth.controller.js";

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", isLoggedIn, logout);
router.get("/refresh", isLoggedIn, refreshToken);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/profile", isLoggedIn, authorize(['ADMIN']), getProfile);
router.put("/password/change", isLoggedIn, changePassword);

export default router;
