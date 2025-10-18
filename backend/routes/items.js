import express from "express";
import multer from "multer";
import { verifyAdmin } from "../middleware/auth.js";
import {
  getItems,
  createItem,
  getRecommendations,
  getItemsMeta,
  updateItem, // import controller updateItem
  deleteItem, // optional: untuk hapus
} from "../controllers/itemController.js";
import Item from "../models/itemModel.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// GET semua item dengan pagination / search
router.get("/", getItems);

// GET meta info
router.get("/meta", getItemsMeta);

// GET rekomendasi
router.get("/:identifier/recommendations", getRecommendations);

// GET single item by ID or slug
router.get("/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;
    let item;

    // cek jika identifier adalah ObjectId
    if (/^[0-9a-fA-F]{24}$/.test(identifier)) {
      item = await Item.findById(identifier).populate("category location");
    }
    if (!item) {
      item = await Item.findOne({ slug: identifier }).populate("category location");
    }
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    console.error("❌ Error fetching item:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create item (admin)
router.post("/", verifyAdmin, upload.array("images"), createItem);

// **PUT update item (admin)**
router.put("/:id", verifyAdmin, upload.array("images"), updateItem);

// **DELETE item (admin)**
router.delete("/:id", verifyAdmin, deleteItem);

export default router;
