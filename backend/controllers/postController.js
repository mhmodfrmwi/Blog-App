const asyncHandler = require("express-async-handler");
const {
  validateCreatePost,
  Post,
  validateUpdatePost,
} = require("../DB/postModel");
const {
  uploadToCloudinary,
  removeFromCloudinary,
} = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const { Comment } = require("../DB/commentModel");
const createPost = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No photo provided",
    });
  }

  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const image = await uploadToCloudinary(imagePath);

  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: image.secure_url,
      publicId: image.public_id,
    },
  });
  fs.unlinkSync(imagePath);
  return res.status(201).json({
    message: "Post created successfully",
    post: post,
  });
});

const getAllPosts = asyncHandler(async (req, res) => {
  const { category } = req.query;
  let posts;
  if (category) {
    posts = await Post.find({ category: category });
  } else {
    posts = await Post.find();
  }

  res.status(200).json(posts);
});

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId })
    .populate("user", ["-password"])
    .populate("comments");
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }
  res.status(200).json(post);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId });
  if (post) {
    if (req.user.id === post.user.toString() || req.user.isAdmin) {
      await Post.findOneAndDelete({ _id: req.params.postId });
      await removeFromCloudinary(post.image.url);
      await Comment.deleteMany({ postId: post._id });
      return res.status(200).json({
        message: "Post deleted successfully",
        post,
      });
    } else {
      return res.status(401).json({
        message: "You are not allowed to delete this post",
      });
    }
  }
  return res.status(404).json({
    message: "Post not found",
  });
});

const updatePost = asyncHandler(async (req, res) => {
  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const post = await Post.findOne({ _id: req.params.postId });
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  if (req.user.id !== post.user.toString()) {
    return res.status(400).json({
      message: "You are not allowed to this action",
    });
  }

  const updatedPost = await Post.findOneAndUpdate(
    { _id: req.params.postId },
    req.body,
    { new: true }
  ).populate("user", ["-password"]);

  return res.status(200).json(updatedPost);
});

const updatePostPhoto = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No photo provided",
    });
  }

  const post = await Post.findOne({ _id: req.params.postId });
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  if (req.user.id !== post.user.toString()) {
    return res.status(400).json({
      message: "You are not allowed to this action",
    });
  }

  await removeFromCloudinary(post.image.publicId);
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const image = await uploadToCloudinary(imagePath);
  const updatedPost = await Post.findOneAndUpdate(
    { _id: req.params.postId },
    {
      $set: {
        image: {
          url: image.secure_url,
          publicId: image.public_id,
        },
      },
    },
    {
      new: true,
    }
  );
  res.status(200).json(updatedPost);
  fs.unlinkSync(imagePath);
});

const toggleLike = asyncHandler(async (req, res) => {
  const loggedINUser = req.user.id;
  const postId = req.params.postId;

  const post = await Post.findOne({ _id: postId });
  if (!post) {
    return res.status(400).json({
      message: "Post not found",
    });
  }

  const isLiked = post.likes.find((user) => user.toString() === loggedINUser);
  let updatedPost;
  if (isLiked) {
    updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $pull: {
          likes: loggedINUser,
        },
      },
      {
        new: true,
      }
    );
  } else {
    updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $push: {
          likes: loggedINUser,
        },
      },
      {
        new: true,
      }
    );
  }

  res.status(200).json(updatedPost);
});
module.exports = {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
  updatePostPhoto,
  toggleLike,
};
