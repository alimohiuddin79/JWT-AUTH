import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;