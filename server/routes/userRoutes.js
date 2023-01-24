import express from "express";
const router = express.Router();
import {signUp, login, logout, forgotPassword, resetPassword, getProfile} from "../controllers/auth.controller.js"

router.post("/signup", signUp);
router.get("/login", login);
router.get("/logout", logout);
router.get("/password/forgot", forgotPassword);
router.put("/password/reset/:resetToken", resetPassword);
router.get("/profile", getProfile);

export default router