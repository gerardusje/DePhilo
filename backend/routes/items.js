import express from "express";
import multer from "multer";
import { verifyAdmin } from "../middleware/auth.js";
import { getItems, createItem,getRecommendations } from "../controllers/itemController.js";
import Item from "../models/itemModel.js"; // ✅ penting!


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ✅ GET semua item
router.get("/", getItems);
router.get("/:id/recommendations", getRecommendations);


// ✅ GET item berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ POST buat item baru
router.post("/", verifyAdmin, upload.single("image"), createItem);



export default router;
