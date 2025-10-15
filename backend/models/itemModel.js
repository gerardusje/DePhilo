import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    year: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    location: { type: String }, // ✅ asal daerah / lokasi item
    imageUrl: { type: String },
    images: [{ type: String }],  // <-- tambahkan ini untuk menyimpan array URL gambar
    width: { type: Number, required: true },   // 👈 Tambahkan ini
    height: { type: Number, required: true },  // 👈 Dan ini
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);
export default Item;
