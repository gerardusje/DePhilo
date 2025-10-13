import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  imageUrl: { type: String },
}, { timestamps: true });

const Item = mongoose.model("Item", ItemSchema);
export default Item;
