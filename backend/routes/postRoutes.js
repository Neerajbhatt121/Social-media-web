import express from 'express';
import formidable from "express-formidable";
import { requireSignIn } from '../middleware/authMiddleware.js';

import { createPostController } from '../Controllers/postController.js';
const app = express();

const router = express.Router();

// --------------------//
// Create a new post 
router.post('/create-post',requireSignIn ,formidable(), createPostController)

export default router;