import mongoosse from 'mongoose';

const userSchema = new mongoosse.Schema(
    {
    name: {
        type: String,
        required: true,
        trim: true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    },
    friends:[{
        type: mongoosse.Schema.Types.ObjectId,
        ref: 'user'
    }],
    conversation: [{
        type: mongoosse.Schema.Types.ObjectId,
        ref: 'conversation'
    }],
    isGrpAdm: {
        type: Boolean,
        default: 0
    }
},
    { timeStamps: true}
)

export default mongoosse.model("user", userSchema);