const express = require("express");
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/verifyToken");
const {
  createCategory,
  getAllCategories,
  deleteCategory,
} = require("../controllers/categoryController");
const route = express.Router();
route
  .route("/")
  .post(verifyTokenAndAdmin, createCategory)
  .get(getAllCategories);
route.route("/:categoryId").delete(verifyTokenAndAdmin, deleteCategory);
module.exports = route;
