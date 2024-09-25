const asyncHandler = require("express-async-handler");
const { validateCreateCategory, Category } = require("../DB/categoryModel");
const createCategory = asyncHandler(async (req, res) => {
  const { error } = validateCreateCategory(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const category = await Category.create({
    title: req.body.title,
    user: req.user.id,
  });

  return res.status(201).json(category);
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  return res.status(200).json(categories);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }
  await Category.findOneAndDelete({ _id: req.params.categoryId });
  return res.status(200).json({
    message: "Category deleted successfully",
    category: {
      id: category._id,
      title: category.title,
    },
  });
});
module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
};
