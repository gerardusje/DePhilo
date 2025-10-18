import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/categoryModel.js"; // pastikan path sesuai

dotenv.config();

// Data kategori dengan key 3 huruf
const categories = [
  { name: "Patung", key: "PAT" },
  { name: "Kain", key: "KAI" },
  { name: "Meja", key: "MEJ" },
  { name: "Kursi", key: "KUR" },
  { name: "Kerajinan", key: "KJN" },
  { name: "Pusaka", key: "PUS" },
  { name: "Lukisan", key: "LUK" },
  { name: "Perhiasan Antik", key: "PHA" },
  { name: "Jam Antik", key: "JAM" },
  { name: "Perabot Kuno", key: "PBN" },
].map(cat => ({
  ...cat,
  slug: cat.name.toLowerCase().replace(/\s+/g, "-")
}));

// Seeder function
const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected ✅");

    // Hapus data lama
    await Category.deleteMany();

    // Insert data baru
    await Category.insertMany(categories);

    console.log("✅ Seeder kategori berhasil dijalankan");
    process.exit();
  } catch (err) {
    console.error("❌ Seeder kategori gagal:", err);
    process.exit(1);
  }
};

seedCategories();
