import express from 'express';
import { createMessage, GetMessage } from "../Controllers/messageController.js";
const router = express.Router();

// Create message
router.post("/", createMessage)

// get Message
router.get("/:chatId", GetMessage)

export default router;