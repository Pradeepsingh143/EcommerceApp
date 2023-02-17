import express from "express";
import {getAllImages, deleteImage, uploadImage} from "../controllers/images.cloudinary.js"
import { isLoggedIn, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/get", isLoggedIn, authorize(['ADMIN']), getAllImages);
router.get("/post", isLoggedIn, authorize(['ADMIN']), uploadImage);
router.get("/delete/:id", isLoggedIn, authorize(['ADMIN']), deleteImage);


export default router;
