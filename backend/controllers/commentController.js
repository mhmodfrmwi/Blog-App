const asyncHandler = require("express-async-handler");
const {
  Comment,
  validateCreateComment,
  validateUpdateComment,
} = require("../DB/commentModel");
const { User } = require("../DB/userModel");

const createComment = asyncHandler(async (req, res) => {
  const { error } = validateCreateComment(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const profile = await User.findById(req.user.id);
  const comment = await Comment.create({
    postId: req.body.postId,
    userId: profile.id,
    text: req.body.text,
    userName: profile.userName,
  });

  return res.status(201).json(comment);
});

const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({}, ["-__v"]);

  return res.status(200).json(comments);
});

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById({
    _id: req.params.commentId,
  });
  if (!comment) {
    return res.status(404).json({
      message: "Comment not found",
    });
  }

  if (!(comment.userId.toString() === req.user.id || req.user.isAdmin)) {
    return res.status(401).json({
      message: "You are not allowed to this action",
    });
  }

  await Comment.findOneAndDelete({ _id: req.params.commentId });
  res.status(200).json({
    comment,
    message: "Comment deleted sucssefully",
  });
});

const updateComment = asyncHandler(async (req, res) => {
  const { error } = validateUpdateComment(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    return res.status(404).json({
      message: "Comment not found",
    });
  }

  const updatedComment = await Comment.findOneAndUpdate(
    {
      _id: req.params.commentId,
    },
    {
      $set: {
        text: req.body.text,
      },
    },
    {
      new: true,
    }
  );

  return res.status(200).json(updatedComment);
});
module.exports = {
  createComment,
  getAllComments,
  deleteComment,
  updateComment,
};
