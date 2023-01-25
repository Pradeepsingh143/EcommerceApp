import express from "express";
import {
  createCollection,
  updateCollection,
  deleteCollection,
  getAllCollections,
} from "../controllers/collection.controller.js";

const router = express.Router();

router.post("/create/collection", createCollection);
router.put("/update/collection/:id", updateCollection);
router.delete("/delete/collection/:id", deleteCollection);
router.get("/collections", getAllCollections);

export default router;
