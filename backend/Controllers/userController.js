import userModal from '../modals/userModal.js';

export const finduserbyid = async (req, res) => {
    try {
        const {userId} = req.params;
        console.log(userId, "sajkhsadfklhj")
        const user = await userModal.findOne({ _id: userId })
        console.log(user)

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).send({
            sucess:true,
            message:"Get the user",
            user
        })
    } catch (error) {   
        console.log(error);
    }
}
