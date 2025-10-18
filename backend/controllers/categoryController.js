import Category from "../models/categoryModel.js";

// GET semua kategori
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil kategori",
    });
  }
};

// Tambah kategori baru
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Nama kategori wajib diisi",
      });
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const newCategory = await Category.create({ name, slug, description });

    res.status(201).json({
      success: true,
      category: newCategory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Gagal membuat kategori",
    });
  }
};
