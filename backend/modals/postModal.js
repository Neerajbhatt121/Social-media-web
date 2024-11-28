import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        description: {
            type: String,
            default:"nothing",
        },
        photo: {
            data:Buffer,
            contentType:String,
        },
        totallikes:{
            type:Number,
            default: 0,
        },
        likes: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "user",
            },
          ],
        hashtag:[{
            type:String,
            trim:true,
        }]
    },
    {timestamps: true}
)

export default mongoose.model('post', postSchema);