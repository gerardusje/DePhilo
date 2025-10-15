import express from "express";
import Item from "../models/itemModel.js"; // gunakan model utama
import mongoose from "mongoose";

const router = express.Router();

// Contoh kategori dan lokasi dummy
const categories = ["kain", "patung", "furniture", "lukisan", "topeng"];
const locations = ["Bali", "Yogyakarta", "Sumatera", "Kalimantan", "Papua", "Jawa Barat"];

// ===========================
// Generate dummy items
// ===========================
router.get("/generate/:count", async (req, res) => {
  const count = parseInt(req.params.count) || 10;
  const items = [];

  // rasio gambar (width x height)
  const ratios = [
    [600, 400], // landscape
    [400, 600], // portrait
    [500, 500], // square
    [800, 533], // wide
    [700, 900], // tall
  ];

 for (let i = 1; i <= count; i++) {
    const [w, h] = ratios[Math.floor(Math.random() * ratios.length)];

    // Tentukan jumlah gambar acak antara 4–8
    const imageCount = Math.floor(Math.random() * 9) + 10; // 4,5,6,7,8
    const images = [];

    for (let j = 0; j < imageCount; j++) {
      // gunakan seed berbeda agar URL unik
      images.push(`https://picsum.photos/seed/${i}-${j}/${w}/${h}`);
    }

    items.push({
      name: `Item Dummy ${i}`,
      year: `${2000 + (i % 24)}`,
      description: `Deskripsi dummy item ${i}. Barang antik buatan tangan dengan detail unik.`,
      price: 10000 + i * 500,
      category: categories[i % categories.length],
      location: locations[i % locations.length],
      imageUrl: images[0], // tetap simpan gambar utama
      images,               // array semua gambar
      width: w,
      height: h,
    });
  }

  try {
    const inserted = await Item.insertMany(items);
    res.json({
      message: `${inserted.length} dummy items berhasil dibuat`,
      items: inserted,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Gagal generate dummy data",
      error: err.message,
    });
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
    res.status(500).json({
      message: "Gagal menghapus items",
      error: err.message,
    });
  }
});

export default router;
