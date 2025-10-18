import express from "express";
import { getCategories, createCategory } from "../controllers/categoryController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// GET /api/categories
// Ambil semua kategori
router.get("/", getCategories);

// POST /api/categories
// Tambah kategori baru (admin-only)
router.post("/", verifyAdmin, createCategory);

export default router;
