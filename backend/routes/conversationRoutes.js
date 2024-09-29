import express from "express";
import {
    createConversation,
    findconversation,
    getAllconversation,
} from "../Controllers/conversationController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/conv/:userId", requireSignIn, getAllconversation);
router.post("/conv-create", requireSignIn, createConversation);
router.get("/conv-find/:senId/:revId", requireSignIn, findconversation);

export default router;