import express from "express";
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  getProductByCollectionId,
} from "../controllers/product.controller.js";
const router = express.Router();

router.post("/create", isLoggedIn, isAdmin, addProduct);
router.put("/update/:id", isLoggedIn, isAdmin, updateProduct);
router.delete("/delete/:id", isLoggedIn, isAdmin, deleteProduct);
router.get("/get/:id", getProductById);
router.get("/get", getAllProducts);
router.get("/collection/:id", getProductByCollectionId);


export default router;
