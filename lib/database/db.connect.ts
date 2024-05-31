import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

let cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDatabase = async () => {
    if (cached.conn) {
        console.log("🍃 Returning CACHED MongoDB Connection")
        return cached.conn;
    }

    if (!MONGODB_URI) throw new Error('⚠️ MONGODB_URI is missing !!')

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
    });

    cached.conn = await cached.promise

    console.log(" 🍃Returning a NEW MongoDB Connection")
    return cached.conn
}