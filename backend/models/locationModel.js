import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // nama lokasi unik
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
}, {
  timestamps: true, // opsional, untuk createdAt & updatedAt
});

export default mongoose.model("Location", locationSchema, "locations");
