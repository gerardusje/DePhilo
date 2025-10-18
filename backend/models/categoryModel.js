import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  key: {
    type: String,
    required: true,
    unique: true, // key 3 huruf unik
    uppercase: true,
    trim: true,
    minlength: 2,
    maxlength: 3,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
});

// Menentukan koleksi secara eksplisit
export default mongoose.model("Category", categorySchema, "categories");
