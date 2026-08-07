import mongoose from "mongoose";

const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI || process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/probmap";
  try {
    await mongoose.connect(primaryUri);
    console.log(`Successfully connected to primary database`);
  } catch (error) {
    console.warn("Primary database connection failed:", error.message || error);
    console.log("Attempting local MongoDB connection (127.0.0.1:27017)...");
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/probmap");
      console.log(`Successfully connected to local MongoDB fallback`);
    } catch (localErr) {
      console.error("Local database connection also failed:", localErr);
      process.exit(1);
    }
  }
};

export default connectDB;
