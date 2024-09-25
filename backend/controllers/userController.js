const { User, validateUpdate } = require("../DB/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const {
  uploadToCloudinary,
  removeFromCloudinary,
  removeMultibleFromCloudinary,
} = require("../utils/cloudinary");
const { Post } = require("../DB/postModel");
const { Comment } = require("../DB/commentModel");
const { default: mongoose } = require("mongoose");
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate("posts");
  res.status(200).json({
    users: users,
  });
});
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId }, [
    "-password",
  ]).populate("posts");
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  return res.status(200).json({ user });
});
const updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  if (req.body?.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    { new: true }
  ).populate("posts");
  res.status(200).json(updatedUser);
});
const usersCount = asyncHandler(async (req, res) => {
  const users = await User.find();
  const usersCounter = users.length;
  res.status(200).json({
    count: usersCounter,
  });
});
const uploadPhotoController = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const image = await uploadToCloudinary(imagePath);
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: "Invalid user ID",
    });
  }

  const user = await User.findById(userId);

  if (user.profilePhoto.publicId) {
    await removeFromCloudinary(user.profilePhoto.publicId);
  }
  user.profilePhoto = {
    url: image.secure_url,
    publicId: image.public_id,
  };
  await user.save();

  fs.unlinkSync(imagePath);
  return res.status(200).json({
    message: "Photo uploaded successfully",
    profilePhoto: user.profilePhoto,
  });
});
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const posts = await Post.find({ user: user._id });
  const PublicIds = posts?.map((post) => post.publicId);
  if (PublicIds?.length > 0) {
    await removeMultibleFromCloudinary(PublicIds);
  }
  if (user.profilePhoto.publicId) {
    await removeFromCloudinary(user.profilePhoto.publicId);
  }
  await User.findByIdAndDelete(user._id);
  await Post.deleteMany({ user: user._id });
  await Comment.deleteMany({ userId: user._id });
  return res.status(200).json({
    message: "user deleted successfully",
  });
});
module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  usersCount,
  uploadPhotoController,
  deleteUser,
};
