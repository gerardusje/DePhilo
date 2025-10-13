import express from "express";
import Category from "../models/Category.js";
import { verifyAdmin } from "../middleware/auth.js"; // pastikan ada middleware admin

const router = express.Router();

// GET semua kategori
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// POST tambah kategori baru (admin only)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Nama kategori wajib diisi" });

    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Kategori sudah ada" });

    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json({ message: "Kategori berhasil ditambahkan", category: newCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// PUT update kategori (admin only)
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });

    if (name) category.name = name;
    if (description) category.description = description;

    await category.save();
    res.json({ message: "Kategori berhasil diperbarui", category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// DELETE kategori (admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });

    res.json({ message: "Kategori berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

export default router;
