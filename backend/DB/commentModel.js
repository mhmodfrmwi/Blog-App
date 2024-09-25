const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
const validateCreateComment = (obj) => {
  const schema = Joi.object({
    postId: Joi.string().required(),
    text: Joi.string().trim().required(),
  });
  return schema.validate(obj);
};
const validateUpdateComment = (obj) => {
  const schema = Joi.object({
    text: Joi.string().trim().required(),
    postId: Joi.string().trim().required(),
  });
  return schema.validate(obj);
};
module.exports = {
  Comment,
  validateCreateComment,
  validateUpdateComment,
};
