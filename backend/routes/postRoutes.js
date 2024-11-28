import express from 'express';
import formidable from "express-formidable";
import { getAllPosts, GetPostController, getPostsOfUser, PostLiked } from '../Controllers/postController.js';
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

//---------------------//
// Get Controll Post
router.get('/get/getControllPost/:page',requireSignIn, GetPostController)

router.post('/like/:postId',requireSignIn, PostLiked)

export default router;