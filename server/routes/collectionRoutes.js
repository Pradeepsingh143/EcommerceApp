import express from "express";
import {
  createCollection,
  updateCollection,
  deleteCollection,
  getAllCollections,
} from "../controllers/collection.controller.js";
import { isLoggedIn, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", isLoggedIn, authorize('ADMIN'), createCollection);
router.put("/update/:id", isLoggedIn, authorize('ADMIN'), updateCollection);
router.delete("/delete/:id", isLoggedIn, authorize('ADMIN'), deleteCollection);
router.get("/get", getAllCollections);

export default router;
