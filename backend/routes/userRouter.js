const express = require("express");

const {
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const {
  getAllUsers,
  updateUser,
  usersCount,
  uploadPhotoController,
  deleteUser,
  getUser,
} = require("../controllers/userController");
const uploadPhoto = require("../middlewares/uploadPhoto");

const route = express.Router();
route.use(express.json());
route.get("/getAllUsers", verifyTokenAndAdmin, getAllUsers);
route.put("/:userId", verifyTokenAndUser, updateUser);
route.get("/:userId", getUser);
route.get("/count", verifyTokenAndAdmin, usersCount);
route.post(
  "/upload-profile-photo",
  verifyToken,
  uploadPhoto.single("image"),
  uploadPhotoController
);
route.delete("/:userId", verifyTokenAndAuthorization, deleteUser);
module.exports = route;
