import mongoose from "mongoose";

let cached = global.__mongoose;
if (!cached) {
  cached = global.__mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI || process.env.MODGODB_URI; // fallback if you set the typo
    if (!uri) {
      console.error("Missing MONGODB_URI");
      return null;
    }

    const opts = {
      bufferCommands: false,
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    cached.promise = mongoose
      .connect(`${uri}/saloniq`, opts)
      .then((m) => {
        console.log("MongoDB connected");
        return m;
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        cached.promise = null;
        return null;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;