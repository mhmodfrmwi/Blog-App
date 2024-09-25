import { AddCategory } from "@/redux/apiCalls/categoryApiCall";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!category.trim()) {
      return toast.error("Category is required");
    }
    const formData = new FormData();
    formData.append("title", category);

    dispatch(AddCategory(formData));
    setCategory("");
  };
  return (
    <form
      className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto mt-8"
      onSubmit={formSubmitHandler}
    >
      {/* Form Heading */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Add New Category
      </h2>

      {/* Category Title Label */}
      <label
        htmlFor="category-title"
        className="block text-gray-600 text-sm font-medium mb-2"
      >
        Category Title
      </label>

      {/* Input Field */}
      <input
        type="text"
        id="category-title"
        value={category}
        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all"
        placeholder="Enter category name"
        onChange={(e) => setCategory(e.target.value)}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-all focus:outline-none focus:ring-4 focus:ring-cyan-400"
      >
        Add Category
      </button>
    </form>
  );
};

export default CategoryForm;
