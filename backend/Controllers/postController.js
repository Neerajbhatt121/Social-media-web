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