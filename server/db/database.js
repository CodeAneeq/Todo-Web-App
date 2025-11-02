import mongoose from "mongoose";

export async function connectDB(URI) {
    try {
        await mongoose.connect(URI);
        console.log("Database connected successfully!");
    } catch (error) {
        console.log(error)
    }
}
