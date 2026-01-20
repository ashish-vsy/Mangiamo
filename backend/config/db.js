import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }
        await mongoose.connect(uri);
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1); 
    }
};
