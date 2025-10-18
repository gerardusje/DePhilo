import express from "express";
import { getLocations, createLocation } from "../controllers/locationController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// GET /api/locations
// Ambil semua lokasi
router.get("/", getLocations);

// POST /api/locations
// Tambah lokasi baru (admin-only)
router.post("/", verifyAdmin, createLocation);

export default router;
