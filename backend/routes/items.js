import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";
import { verifyAdmin } from "../middleware/auth.js";
import Item from "../models/Item.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ===== GET all items (optionally filter & sort) =====
router.get("/", async (req, res) => {
  try {
    const { category, priceMin, priceMax, sortField, sortOrder } = req.query;
    const filter = {};

    // filter category
    if (category) filter.category = category;

    // filter harga
    if (priceMin) filter.price = { ...filter.price, $gte: Number(priceMin) };
    if (priceMax) filter.price = { ...filter.price, $lte: Number(priceMax) };

    // build query
    let query = Item.find(filter);

    // sort
    if (sortField) {
      const order = sortOrder === "desc" ? -1 : 1;
      query = query.sort({ [sortField]: order });
    }

    const items = await query.exec();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// ===== GET item by ID =====
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "ID tidak valid" });

    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item tidak ditemukan" });

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// ===== POST create new item (admin only) =====
router.post("/", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, year, description, price, category } = req.body;
    if (!req.file) return res.status(400).json({ message: "Gambar wajib diunggah" });

    const uploadToCloudinary = (fileBuffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "pusat-antik" },
          (error, result) => (result ? resolve(result) : reject(error))
        );
        stream.end(fileBuffer);
      });

    const result = await uploadToCloudinary(req.file.buffer);

    const newItem = new Item({
      name,
      year,
      description,
      price,
      category,
      imageUrl: result.secure_url,
    });

    await newItem.save();
    res.json({ message: "Barang berhasil ditambahkan", item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// ===== PUT update item (admin only) =====
router.put("/:id", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "ID tidak valid" });

    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item tidak ditemukan" });

    const { name, year, description, price, category } = req.body;

    // Update gambar jika ada
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "pusat-antik" },
          (error, result) => (result ? resolve(result) : reject(error))
        );
        stream.end(req.file.buffer);
      });
      item.imageUrl = result.secure_url;
    }

    // Update field jika ada
    item.name = name ?? item.name;
    item.year = year ?? item.year;
    item.description = description ?? item.description;
    item.price = price ?? item.price;
    item.category = category ?? item.category;

    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// ===== DELETE item (admin only) =====
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "ID tidak valid" });

    const item = await Item.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ message: "Item tidak ditemukan" });

    res.json({ message: "Item berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

export default router;
