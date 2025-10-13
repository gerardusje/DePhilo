// routes/dummy.js
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Pakai model Item yang sudah ada atau buat baru jika belum
const Item = mongoose.models.Item || mongoose.model("Item", new mongoose.Schema({
  name: String,
  year: String,
  description: String,
  price: Number,
  category: String,
  imageUrl: String,
}));

// Kategori contoh
const categories = ["kain", "patung", "futniture", "lukisan", "topeng"];

// ===========================
// Generate dummy items
// ===========================
router.get("/generate/:count", async (req, res) => {
  const count = parseInt(req.params.count) || 10;
  const items = [];

  for (let i = 1; i <= count; i++) {
    items.push({
      name: `Item Dummy ${i}`,
      year: `${2000 + (i % 24)}`,
      description: `Deskripsi dummy item ${i}`,
      price: 10000 + i * 500,
      category: categories[i % categories.length],
      imageUrl: `https://picsum.photos/seed/${i}/600/400`,
    });
  }

  try {
    const inserted = await Item.insertMany(items);
    res.json({ message: `${inserted.length} dummy items created`, items: inserted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal generate dummy data", error: err.message });
  }
});

// ===========================
// Hapus semua items
// ===========================
router.delete("/delete-all", async (req, res) => {
  try {
    const result = await Item.deleteMany({});
    res.json({ message: `Berhasil menghapus ${result.deletedCount} items` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus items", error: err.message });
  }
});

export default router;
