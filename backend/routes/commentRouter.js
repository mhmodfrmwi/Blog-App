const express = require("express");
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const {
  createComment,
  getAllComments,
  deleteComment,
  updateComment,
} = require("../controllers/commentController");
const route = express.Router();

route
  .route("/")
  .post(verifyToken, createComment)
  .get(verifyToken, getAllComments);

route
  .route("/:commentId")
  .delete(verifyToken, deleteComment)
  .put(verifyToken, updateComment);
module.exports = route;
