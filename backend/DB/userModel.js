const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const passwordComplexity = require("joi-password-complexity");
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png",
        publicId: null,
      },
    },
    bio: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toOject: { virtuals: true },
  }
);
userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "user",
});
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY
  );
};
const validateRegisteration = (obj) => {
  const schema = Joi.object({
    userName: Joi.string().trim().min(4).max(100).required(),
    email: Joi.string().trim().min(6).max(100).required().email(),
    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
};
const validateLogin = (obj) => {
  const schema = Joi.object({
    email: Joi.string().trim().min(6).max(100).required().email(),
    password: Joi.string().trim().required(),
  });
  return schema.validate(obj);
};
const validatePassword = (obj) => {
  const schema = Joi.object({
    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
};
const validateEmail = (obj) => {
  const schema = Joi.object({
    email: Joi.string().trim().min(6).max(100).required().email(),
  });
  return schema.validate(obj);
};
const validateUpdate = (obj) => {
  const schema = Joi.object({
    userName: Joi.string().trim().min(4).max(100),
    password: passwordComplexity(),
    bio: Joi.string().trim().min(4).max(100),
  });
  return schema.validate(obj);
};
const User = mongoose.model("User", userSchema);
module.exports = {
  User,
  validateRegisteration,
  validateLogin,
  validateUpdate,
  validateEmail,
  validatePassword,
};
