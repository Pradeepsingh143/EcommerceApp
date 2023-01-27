import express from "express";
import {
  createCollection,
  updateCollection,
  deleteCollection,
  getAllCollections,
} from "../controllers/collection.controller.js";
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", isLoggedIn, isAdmin, createCollection);
router.put("/update/:id", isLoggedIn, isAdmin, updateCollection);
router.delete("/delete/:id", isLoggedIn, isAdmin, deleteCollection);
router.get("/get", getAllCollections);

export default router;
