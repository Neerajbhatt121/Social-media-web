import mongoose from "mongoose";

const connectDb = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to Mongodb ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;