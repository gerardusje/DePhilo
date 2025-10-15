import Item from "../models/itemModel.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "pusat-antik" },
      (error, result) => (result ? resolve(result) : reject(error))
    );
    stream.end(fileBuffer);
  });

// GET semua item
export const getItems = async (req, res) => {
  try {
    const { category, location, priceMin, priceMax, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (location) filter.location = location;
    if (priceMin) filter.price = { ...filter.price, $gte: Number(priceMin) };
    if (priceMax) filter.price = { ...filter.price, $lte: Number(priceMax) };
    if (search) filter.name = { $regex: search, $options: "i" };

    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json({ total: items.length, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST tambah item
export const createItem = async (req, res) => {
  try {
    const { name, price, category, location } = req.body;
    if (!name || !price || !req.file)
      return res.status(400).json({ message: "Nama, harga, dan gambar wajib diisi" });

    const result = await uploadToCloudinary(req.file.buffer);
    const newItem = new Item({
      ...req.body,
      price: Number(price),
      imageUrl: result.secure_url,
    });
    await newItem.save();

    res.status(201).json({ message: "Item berhasil ditambahkan", item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// itemController.js
export const getRecommendations = async (req, res) => {
  const { id } = req.params;
  const currentItem = await Item.findById(id);
  if (!currentItem) return res.status(404).send("Item not found");

  const sameCategory = await Item.find({
    category: currentItem.category,
    _id: { $ne: id },
  }).limit(4);

  let recommendations = [...sameCategory];

  if (recommendations.length < 4) {
    const limit = 4 - recommendations.length;
    const sameLocation = await Item.find({
      location: currentItem.location,
      category: { $ne: currentItem.category },
      _id: { $ne: id },
    }).limit(limit);

    recommendations = [...recommendations, ...sameLocation];
  }

  res.json(recommendations);
};


