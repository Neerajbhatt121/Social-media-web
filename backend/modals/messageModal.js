import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId: String, // Reference to the conversation
    senderId: String,
    text: String,
    timestamp: { type: Date, default: Date.now } // Stores date and time
 });
 


export default mongoose.model("Message", messageSchema);
