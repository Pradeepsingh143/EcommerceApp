import express from "express";
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

router.post("/create", isLoggedIn, isAdmin, addProduct);
router.put("/update/:id", isLoggedIn, isAdmin, updateProduct);
router.delete("/delete/:id", isLoggedIn, isAdmin, deleteProduct);
router.get("/get/:id", getProductById);
router.get("/get", getAllProducts);


export default router;
