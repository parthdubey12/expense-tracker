import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("URI Loaded:", process.env.MONGO_URI ? "YES" : "NO");

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB Connected Successfully");
} catch (err) {
  console.error("❌ Full Error:");
  console.error(err);
}