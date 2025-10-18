import mongoose from "mongoose";
import slugify from "slugify";

const ItemSchema = new mongoose.Schema(
  {
    customId: { type: String, unique: true }, // ID custom
    name: { type: String, required: true },
    year: { type: Number },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
    images: [{ type: String }], // multiple images
    width: { type: Number, required: false },
    height: { type: Number, required: false },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

// generate slug otomatis sebelum save
ItemSchema.pre("save", async function (next) {
  if (this.isModified("name") || this.isModified("category") || this.isModified("location") || !this.slug) {
    // ambil nama category
    let categoryName = "unknown-category";
    let locationName = "unknown-location";

    try {
      const cat = await mongoose.model("Category").findById(this.category);
      if (cat) categoryName = cat.name;

      const loc = await mongoose.model("Location").findById(this.location);
      if (loc) locationName = loc.name;
    } catch (err) {
      console.warn("Gagal ambil nama category/location untuk slug:", err);
    }

    const baseSlug = slugify(
      `${this.name}-${categoryName}-${locationName}`,
      { lower: true, strict: true }
    );

    const idPart = this._id ? this._id.toHexString().slice(-8) : new mongoose.Types.ObjectId().toHexString().slice(-8);
    this.slug = `${baseSlug}-${idPart}`;
  }
  next();
});

// Index gabungan optional untuk keamanan unik
ItemSchema.index({ name: 1, category: 1, location: 1 })

const Item = mongoose.model("Item", ItemSchema);
export default Item;
