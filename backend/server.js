import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer"; // untuk file upload

const storage = multer.memoryStorage(); // supaya bisa diakses di req.files.buffer



import itemsRoute from "./routes/items.js";
import adminRoute from "./routes/admin.js";
import dummyRoute from "./routes/dummy.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";

import { createItem } from "./controllers/itemController.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware untuk parsing form-data (jika ada file upload)
const upload = multer({ storage });

// Contoh route
app.post("/", upload.array("images", 5), createItem);

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Server Railway kamu berhasil berjalan!");
});

// Koneksi MongoDB
mongoose
  .connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes API
app.use("/api/items", itemsRoute);
app.use("/api/admin", adminRoute);
app.use("/api/dummy", dummyRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/locations", locationRoutes);

// Middleware Error Handling
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
