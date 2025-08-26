import mongoose from "mongoose";

const connectDB = async () => {
  const tryConnect = async (uri, label) => {
    console.log(`Connecting to MongoDB (${label}) ...`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`✅ MongoDB connected (${label})`);
  };

  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI not set");
    await tryConnect(uri, "MONGO_URI");
  } catch (primaryErr) {
    console.error("❌ Primary MongoDB connection failed:", primaryErr?.message || primaryErr);

    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }

    try {
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      const mem = await MongoMemoryServer.create();
      const memUri = mem.getUri("berinag");
      await tryConnect(memUri, "memory-server");
      console.warn("⚠️ Running with in-memory MongoDB (data will be lost on restart)");
    } catch (memErr) {
      console.error("❌ Fallback in-memory MongoDB failed:", memErr?.message || memErr);
      process.exit(1);
    }
  }
};

export default connectDB;
