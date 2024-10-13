import express from 'express';
import formidable from "express-formidable";
import { getAllPosts, getPostsOfUser } from '../Controllers/postController.js';
import { requireSignIn } from '../middleware/authMiddleware.js';

import { createPostController } from '../Controllers/postController.js';
const app = express();

const router = express.Router();

// --------------------//
// Create a new post 
router.post('/create-post',requireSignIn ,formidable(), createPostController)

//---------------------//
// Get all posts
router.get('/get/allPosts',requireSignIn, getAllPosts)

//---------------------//
// Get all posts of user
router.get('/get/user-posts/:userId', getPostsOfUser)

export default router;