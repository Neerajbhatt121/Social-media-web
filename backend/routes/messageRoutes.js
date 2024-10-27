import express from 'express';
import { createMessage, GetMessage } from "../Controllers/messageController.js";
const router = express.Router();

// Create message
router.post("/createMessage/:chatId", createMessage)

// get Message
router.get("/getmessages/:chatId", GetMessage)

export default router;