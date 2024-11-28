import fs from "fs";
import mongoose from "mongoose";
import postModal from "../modals/postModal.js";

//---------------------//
// post Create Post
export const createPostController = async (req, res) => {
  try {
    let { description, totallikes, likes } = req.fields;
    const author = req.user._id;
    console.log(author);
    const { photo } = req.files;
    switch (true) {
      case !author:
        return res.status(400).send({ error: "author is enable to fetch" });
      case !description:
        description = "This is the default description";

      case photo && photo.size > 1000000:
    }

    const Post = new postModal({
      author: new mongoose.Types.ObjectId(author),
      description,
      likes,
      totallikes,
    });
    if (photo) {
      Post.photo.data = fs.readFileSync(photo.path);
      Post.photo.contentType = photo.type;
    }

    await Post.save();
    res.status(201).send({
      sucess: true,
      message: "Post uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      sucess: false,
      message: "Error while uploading the post",
    });
  }
};

//----------------------//
// get all posts
export const getAllPosts = async (req, res) => {
  try {
    const  Posts  = await postModal.find();
    if (Posts.length > 0) {
      res.status(200).send({
        success: true, 
        message: "Get all posts",
        Posts
      });
    } else{
      res.status(404).send({
        success: false,
        message: "No posts found for this user",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      sucess: false,
      message: "Error while getting the post",
    });
  }
};


//-------------------------//
// Get Posts of Particular user
export const getPostsOfUser = async (req, res) => {
  const UserId = req.params.userId;
  console.log("userId is this", UserId);
    try {
        const Posts = await postModal.find({author: UserId})
        if(Posts.length > 0){
          res.status(200).send({
            sucess:true,
            message: "Get Posts of Id",
            Posts
          })
        } else {
          res.status(404).send({
            success: false,
            message: "No posts found for this user",
          });
        }
    } catch (error) {
      console.log(error)
      res.status(400).send({
        sucess: false,
        message: "Error while getting the post",
      });
    }
}

//--------------------------------//
// GetPostController
export const GetPostController = async (req, res) => {
  try {
    const pageCount = 6
    const page = req.params.page ? req.params.page : 1
    const  Posts  = await postModal
        .find({})
        .skip((page -1) * pageCount)
        .limit(pageCount)
        .sort({createdAt: -1})
    if (Posts.length > 0) {
      res.status(200).send({
        success: true, 
        message: "Get all posts",
        Posts
      });
    } else{
      res.status(404).send({
        success: false,
        message: "No posts found for this user",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      sucess: false,
      message: "Error while getting the post",
    });
  }
}

//--------------------------------//
// LikethePost
export const PostLiked = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id; // Assuming user info is added via middleware
    console.log("check",postId, userId)
    const post = await postModal.findById(postId);
    if (!post) {
      console.log(post)
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Check if user has already liked the post
    if (post.likes.includes(userId)) {
      // Unlike the post
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
      post.totallikes -= 1;
    } else {
      // Like the post
      post.likes.push(userId);
      post.totallikes += 1;
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: post.likes.includes(userId)
        ? "Post liked successfully"
        : "Post unliked successfully",
      totallikes: post.totallikes,
    });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
