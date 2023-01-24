import express from "express";
const router = express.Router();
import {signUp, login, logout, forgotPassword, resetPassword, getProfile} from "../controllers/auth.controller.js"

router.get("/signup", signUp)

export default router