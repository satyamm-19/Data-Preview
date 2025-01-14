import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  // if (!process.env.MONGODB_URI) {
  //   console.error("MONGODB_URI is not defined in .env file");
  //   process.exit(1);
  // }
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
