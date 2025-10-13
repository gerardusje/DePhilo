// routes/item.js
import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";
import { verifyAdmin } from "../middleware/auth.js";
import Item from "../models/Item.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper: upload file buffer ke Cloudinary
const uploadToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "pusat-antik" },
      (error, result) => (result ? resolve(result) : reject(error))
    );
    stream.end(fileBuffer);
  });

// ==========================
// GET all items (filter/search/sort)
// ==========================
router.get("/", async (req, res) => {
  try {
    const { category, priceMin, priceMax, search, sortField, sortOrder } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (priceMin) filter.price = { ...filter.price, $gte: Number(priceMin) };
    if (priceMax) filter.price = { ...filter.price, $lte: Number(priceMax) };
    if (search) filter.name = { $regex: search, $options: "i" };

    let query = Item.find(filter);

    if (sortField) {
      const order = sortOrder === "desc" ? -1 : 1;
      query = query.sort({ [sortField]: order });
    } else {
      query = query.sort({ createdAt: -1 }); // default sort newest
    }

    const items = await query.exec();
    res.json({ total: items.length, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// ==========================
// GET item by ID
// ==========================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "ID tidak valid" });

    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item tidak ditemukan" });

    res.json({ item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// ==========================
// POST create new item (admin only)
// ==========================
router.post("/", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, year, description, price, category } = req.body;
    const priceNumber = Number(price);

    if (!name || !priceNumber || !req.file) {
      return res.status(400).json({ message: "Nama, harga, dan gambar wajib diisi" });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    const newItem = new Item({
      name,
      year,
      description,
      price: priceNumber,
      category,
      imageUrl: result.secure_url,
    });

    await newItem.save();
    res.status(201).json({ message: "Barang berhasil ditambahkan", item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// ==========================
// PUT update item (admin only)
// ==========================
router.put("/:id", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "ID tidak valid" });

    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item tidak ditemukan" });

    const { name, year, description, price, category } = req.body;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      item.imageUrl = result.secure_url;
    }

    if (name) item.name = name;
    if (year) item.year = year;
    if (description) item.description = description;
    if (price) item.price = Number(price);
    if (category) item.category = category;

    await item.save();
    res.json({ message: "Barang berhasil diperbarui", item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// ==========================
// DELETE item (admin only)
// ==========================
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "ID tidak valid" });

    const item = await Item.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ message: "Item tidak ditemukan" });

    res.json({ message: "Barang berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});


// GET /api/items/stats/category
router.get("/stats/category", async (req, res) => {
  try {
    const stats = await Item.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});


export default router;
