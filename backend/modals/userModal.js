import mongoosse from 'mongoose';

const userSchema = new mongoosse.Schema(
    {
    name: {
        type: String,
        required: true,
        trim: true
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
    isGrpAdm: {
        type: Boolean,
        default: 0
    }
},
    { timeStamps: true}
)

export default mongoosse.model("users", userSchema);