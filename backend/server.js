import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import itemsRoute from "./routes/items.js";
import adminRoute from "./routes/admin.js"; // import route admin
import dummyRoute from "./routes/dummy.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Route utama (root)
app.get("/", (req, res) => {
  res.send("🚀 Server Railway kamu berhasil berjalan!");
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

// koneksi MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// routes
app.use("/api/items", itemsRoute);
app.use("/api/admin", adminRoute); // daftarkan route admin
app.use("/api/dummy", dummyRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
