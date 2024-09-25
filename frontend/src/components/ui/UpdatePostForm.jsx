import { CreatePost, UpdatePost } from "@/redux/apiCalls/postsApiCall";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";
import { GetCategories } from "@/redux/apiCalls/categoryApiCall";
const UpdatePostForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const { postId } = useParams();
  const dispatch = useDispatch();
  dispatch(GetCategories());
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const onChangeHandler = (value, fn) => {
    fn(value);
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return toast.error("Post title is required");
    }
    if (!category.trim()) {
      return toast.error("Post category is required");
    }
    if (!description.trim()) {
      return toast.error("Post description is required");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    dispatch(UpdatePost(formData, postId));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);
  return (
    <form
      action=""
      method="post"
      className="flex flex-col gap-6 bg-white p-8 shadow-lg rounded-lg w-full max-w-lg"
      onSubmit={formSubmitHandler}
    >
      {/* Post Title */}
      <input
        type="text"
        placeholder="Post title"
        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 text-gray-700"
        onChange={(e) => onChangeHandler(e.target.value, setTitle)}
      />

      {/* Post Category */}
      <select
        name=""
        id=""
        value={category}
        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 text-gray-700"
        onChange={(e) => onChangeHandler(e.target.value, setCategory)}
      >
        <option value="">Select Category</option>
        {categories?.map((category) => {
          return (
            <option value={category?.title} key={category?._id}>
              {category?.title}
            </option>
          );
        })}
      </select>

      {/* Post Description */}
      <textarea
        placeholder="Post description"
        value={description}
        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 text-gray-700 h-32 resize-none"
        onChange={(e) => onChangeHandler(e.target.value, setDescription)}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-cyan-600 hover:bg-cyan-800 text-white font-semibold py-3 px-6 rounded-md transition duration-200 flex items-center justify-center"
        disabled={loading} // Optionally disable the button while loading
      >
        {loading ? (
          <>
            <ClipLoader />
          </>
        ) : (
          "Submit Post"
        )}
      </button>
    </form>
  );
};
export default UpdatePostForm;
