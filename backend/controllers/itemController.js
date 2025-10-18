import Item from "../models/itemModel.js";
import Category from "../models/categoryModel.js";
import Location from "../models/locationModel.js";
import cloudinary from "../config/cloudinary.js";

// Helper upload ke Cloudinary
const uploadToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "pusat-antik" },
      (error, result) => (result ? resolve(result) : reject(error))
    );
    stream.end(fileBuffer);
  });

// --- GET ALL ITEMS / FILTER ---
export const getItems = async (req, res) => {
  try {
    const { category, location, minPrice, maxPrice, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (location) filter.location = location;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
    if (search) filter.name = { $regex: search, $options: "i" };

    const items = await Item.find(filter)
      .populate("category", "name slug")
      .populate("location", "name slug")
      .sort({ createdAt: -1 });

    res.json({ items });
  } catch (err) {
    console.error("❌ Error getting items:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// --- GET ITEMS META ---
export const getItemsMeta = async (req, res) => {
  try {
    const count = await Item.countDocuments();
    const prices = await Item.find().select("price -_id");
    const priceList = prices.map((p) => p.price);
    const meta = {
      totalItems: count,
      maxPrice: Math.max(...priceList),
      minPrice: Math.min(...priceList),
    };
    res.json({ meta });
  } catch (err) {
    console.error("❌ Error getting items meta:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// --- GET RECOMMENDATIONS (contoh: berdasarkan kategori sama lokasi) ---
export const getRecommendations = async (req, res) => {
  try {
    const { category, location, excludeId } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (location) filter.location = location;
    if (excludeId) filter._id = { $ne: excludeId };

    const recommendations = await Item.find(filter)
      .limit(5)
      .populate("category", "name slug")
      .populate("location", "name slug");

    res.json({ recommendations });
  } catch (err) {
    console.error("❌ Error getting recommendations:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// --- CREATE ITEM ---
export const createItem = async (req, res) => {
  try {
    const { name, price, category, location, year, description } = req.body;

    if (!name || !price || !category || !location) {
      return res.status(400).json({
        message: "Nama, harga, kategori, dan lokasi wajib diisi",
      });
    }

    if (isNaN(price)) {
      return res.status(400).json({ message: "Price harus berupa angka" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Minimal 1 gambar wajib diupload" });
    }

    // Ambil key kategori & lokasi
    const cat = await Category.findById(category);
    const loc = await Location.findById(location);

    if (!cat || !loc) {
      return res
        .status(400)
        .json({ message: "Kategori atau lokasi tidak valid" });
    }

    const baseKey = `${cat.key}-${loc.key}`;

    // Cari item terakhir dengan kombinasi yang sama
    const lastItem = await Item.find({
      customId: { $regex: `^${baseKey}-\\d{4}$` },
    })
      .sort({ customId: -1 })
      .limit(1);

    let nextNumber = "0001"; // default jika belum ada
    if (lastItem.length > 0) {
      const lastId = lastItem[0].customId;
      const lastNum = parseInt(lastId.slice(-4));
      nextNumber = String(lastNum + 1).padStart(4, "0");
    }

    const customId = `${baseKey}-${nextNumber}`;

    // Upload gambar
    const uploadedImages = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );
    const imageUrls = uploadedImages.map((img) => img.secure_url);

    // Simpan item baru
    const newItem = new Item({
      name,
      price: Number(price),
      category,
      location,
      customId,
      year: year ? Number(year) : undefined,
      description: description || "",
      images: imageUrls,
    });

    await newItem.save();
    res
      .status(201)
      .json({ message: "Item berhasil ditambahkan", item: newItem });
  } catch (err) {
    console.error("❌ Error creating item:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// --- UPDATE ITEM ---
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const existingItem = await Item.findById(id);
    if (!existingItem)
      return res.status(404).json({ message: "Item not found" });

    if (req.files && req.files.length > 0) {
      const uploadedImages = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer))
      );
      const newImageUrls = uploadedImages.map((img) => img.secure_url);
      updateData.images = [...(existingItem.images || []), ...newImageUrls];
    }

    if (updateData.price && isNaN(updateData.price)) {
      return res.status(400).json({ message: "Price harus berupa angka" });
    }

    const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate("category", "name key slug")
      .populate("location", "name key slug");

    res.json({ message: "Item berhasil diupdate", item: updatedItem });
  } catch (err) {
    console.error("❌ Error updating item:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// --- DELETE ITEM ---
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }

    res.json({ message: "Item berhasil dihapus", item: deletedItem });
  } catch (err) {
    console.error("❌ Error deleting item:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};
