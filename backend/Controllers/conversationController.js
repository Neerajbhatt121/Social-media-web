import conversationModal from "../modals/conversationModal.js";

//------------------------//
// create Conversation
export const createConversation = async (req, res) => {
  try {
    const { senId, revId } = req.body;
    const conversation = await conversationModal.findOne({
      members: { $all: [senId, revId] },
    });

    if (conversation) {
      return res.status(200).send(conversation);
    }

    const newconversation = new conversationModal({
      members: [senId, revId],
    });

    const response = await newconversation.save();
    res.status(201).send({ response });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Can't create new conversation",
    });
  }
};

//--------------------//
// Get all chats
export const getAllconversation = async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversation = await conversationModal.find({
      members: { $in: [userId] },
    });
    res.status(200).send({
      conversation,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: "can't load Your chats",
      })
      .json(conversation);
  }
};

//------------------------//
// find chats
export const findconversation = async (req, res) => {
  try {
    const { senId, revId } = req.params;
    const conversation = await conversationModal.find({
      members: { $all: [senId, revId] },
    });
    res.status(200).send({
      conversation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "can't load Your chats",
    });
  }
};
