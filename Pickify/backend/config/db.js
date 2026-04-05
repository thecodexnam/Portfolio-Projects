import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`DataBase is Connected Successfully`);
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}

export default connectDB;