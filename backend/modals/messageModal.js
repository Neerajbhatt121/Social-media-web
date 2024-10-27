import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    members: [String],
    messages: [{
        senderId: String,
        text: String,
        timestamp: Date
    }]
});


export default mongoose.model("Message", messageSchema);
