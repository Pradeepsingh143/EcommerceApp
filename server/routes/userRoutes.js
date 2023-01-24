import express from "express";
const router = express.Router();
import {isLoggedIn} from "../middlewares/auth.middleware.js"
import {signUp, login, logout, forgotPassword, resetPassword, getProfile, changePassword} from "../controllers/auth.controller.js"

router.post("/signup", signUp);
router.get("/login", login);
router.get("/logout", logout);
router.get("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/profile", getProfile);
router.put("/password/change",isLoggedIn, changePassword)

export default router