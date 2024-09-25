const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 200,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: Object,
      default: {
        url: "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png",
        publicId: null,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "postId",
  localField: "_id",
});

const Post = mongoose.model("Post", postSchema);

const validateCreatePost = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(4).max(200).required(),
    description: Joi.string().trim().min(10).max(200).required(),
    category: Joi.string().trim().required(),
  });
  return schema.validate(obj);
};

const validateUpdatePost = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(4).max(200),
    description: Joi.string().trim().min(10).max(200),
    category: Joi.string().trim(),
  });
  return schema.validate(obj);
};
module.exports = {
  Post,
  validateCreatePost,
  validateUpdatePost,
};
