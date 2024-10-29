import messageModal from "../modals/messageModal.js";

//---------------------//
// Create Message
export const createMessage = async(req, res) => {
    const {chatId, senderId, text} = req.body;

    try {
       const message = new messageModal({
        chatId, senderId, text
       }) 

    const response = await message.save();

    res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


//------------------------//
// GetMessage
export const GetMessage = async (req, res) => {
    const {chatId} = req.params;
    try {
        const message = await messageModal.find({chatId})
            .sort({timestamp: -1})
            // .limit(10)
            console.log(message)
        res.status(200).json(message)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}