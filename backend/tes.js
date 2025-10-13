import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function test() {
  try {
    const result = await cloudinary.api.resources({ max_results: 1 });
    console.log("Cloudinary connected:", result.resources.length, "file(s) found");
  } catch (err) {
    console.error("Cloudinary error:", err.message);
  }
}

test();
