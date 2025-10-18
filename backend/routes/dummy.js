import express from "express";
import Item from "../models/itemModel.js";
import categoryModel from "../models/categoryModel.js";
import locationModel from "../models/locationModel.js";
import slugify from "slugify";
import namesByCategory from "../data/namesByCategory.js";

const router = express.Router();
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

router.get("/generate/:count", async (req, res) => {
  const count = parseInt(req.params.count) || 10;
  console.log("=== /generate called ===");
  console.log("Requested count:", count);

  try {
    // Ambil kategori & lokasi
    const categories = await categoryModel.find();
    const locations = await locationModel.find();

    console.log("Categories fetched:", categories.map(c => c.name));
    console.log("Locations fetched:", locations.map(l => l.name));

    if (!categories.length || !locations.length) {
      return res.status(400).json({ message: "Kategori atau lokasi belum ada di DB" });
    }

    const items = [];
    const counters = {}; // counter per kategori
    const ratios = [
      [600, 400], [400, 600], [500, 500], [800, 533], [700, 900]
    ];

    for (let i = 0; i < count; i++) {
      // 1️⃣ Pilih kategori
      const category = randomElement(categories);
      const catCounter = counters[category._id] || 0;
      counters[category._id] = catCounter + 1;

      // 2️⃣ Nama sesuai kategori
      const nameKey = category.name.toLowerCase().replace(/\s+/g, "");
      const nameList = namesByCategory[nameKey];
      const name = nameList && nameList.length
        ? nameList[catCounter % nameList.length]
        : `${category.name} Item ${catCounter + 1}`;

      // 3️⃣ Pilih lokasi
      const location = randomElement(locations);

      // 4️⃣ Buat customId
      const customId = `${category.key}${location.key}${String(counters[category._id]).padStart(4, "0")}`;

      // 5️⃣ Harga & ukuran
      const year = 1980 + (i % 40);
      const price = 150000 + i * 500;
      const [w, h] = randomElement(ratios);

      // 6️⃣ Gambar dummy
      const images = Array.from({ length: 4 + Math.floor(Math.random() * 3) }, (_, j) =>
        `https://picsum.photos/seed/${category.name}-${i}-${j}/${w}/${h}`
      );

      // 7️⃣ Slug unik
      const slugBase = slugify(`${name}-${category.slug}-${location.slug}`, { lower: true, strict: true });
      const slug = `${slugBase}-${new Date().getTime().toString(36).slice(-8)}`;

      console.log(`Category selected: ${category.name} (counter: ${counters[category._id]})`);
      console.log(`Generated name: ${name}`);
      console.log(`Location selected: ${location.name}`);
      console.log(`Custom ID: ${customId}`);
      console.log(`Generated ${images.length} images.`);
      console.log(`Generated slug: ${slug}`);

      items.push({
        customId,
        name,
        year,
        description: `Barang antik kategori ${category.name} asal ${location.name}. ${name} ini memiliki nilai sejarah dan keunikan tersendiri.`,
        price,
        category: category._id,
        location: location._id,
        imageUrl: images[0],
        images,
        width: w,
        height: h,
        slug,
      });
    }

    console.log("Prepared dummy items:", items.map(i => ({
      customId: i.customId,
      name: i.name,
      category: i.category,
      location: i.location,
      slug: i.slug,
    })));

    // Insert ke DB
    const inserted = await Item.insertMany(items, { ordered: false });

    console.log(`Inserted ${inserted.length} items into DB.`);
    res.json({
      message: `${inserted.length} dummy items berhasil dibuat ✅`,
      items: inserted.map(i => ({
        customId: i.customId,
        name: i.name,
        category: i.category,
        location: i.location,
        slug: i.slug,
      })),
    });

  } catch (err) {
    console.error("Error generating dummy items:", err);
    res.status(500).json({ message: "Gagal generate dummy items", error: err.message });
  }
});

export default router;
