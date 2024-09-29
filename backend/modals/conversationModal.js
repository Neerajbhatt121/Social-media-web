import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
{
    members:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ]
},
    {timestamps: true}
)

export default mongoose.model("conversation", conversationSchema);