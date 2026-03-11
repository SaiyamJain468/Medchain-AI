import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/medchain";

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-expect-error - NodeJS Global doesn't have mongoose declared
let cached = global.mongoose;

if (!cached) {
    // @ts-expect-error - NodeJS Global doesn't have mongoose declared
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    };

    console.log("📡 Initializing MedChain Node Connection...");
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("✅ Node Synchronized: MongoDB Connected");
      return mongoose;
    }).catch(err => {
      console.error("❌ Node Synchronization Failed:", err.message);
      throw err;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset promise so we can retry
    throw e;
  }
  
  return cached.conn;
}

export default dbConnect;
export const connectMongoDB = dbConnect;
