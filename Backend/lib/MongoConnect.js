import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

export const MongoConnect = connectToMongo;
