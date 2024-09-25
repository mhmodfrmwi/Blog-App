const express = require("express");
const {
  verifyToken,
  verifyTokenAndUser,
} = require("../middlewares/verifyToken");
const uploadPhoto = require("../middlewares/uploadPhoto");
const {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
  updatePostPhoto,
  toggleLike,
} = require("../controllers/postController");

const route = express.Router();

route
  .route("/")
  .post(verifyToken, uploadPhoto.single("image"), createPost)
  .get(getAllPosts);
route
  .route("/:postId")
  .get(verifyToken, getPost)
  .delete(verifyToken, deletePost)
  .put(verifyToken, updatePost);

route
  .route("/update-post-photo/:postId")
  .put(verifyToken, uploadPhoto.single("image"), updatePostPhoto);

route.route("/like/:postId").post(verifyToken, toggleLike);
module.exports = route;
