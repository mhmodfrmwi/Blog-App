import { useState } from "react";
import { Button } from "./button";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  AddCommentToPost,
  UpdateCommentFromPost,
} from "@/redux/apiCalls/commentApiCall";

const AddComment = ({ postId, update, commentId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      return toast.error("Please write your comment first!");
    }
    const formData = new FormData();
    formData.append("text", comment);
    formData.append("postId", postId);
    if (update) {
      dispatch(UpdateCommentFromPost(commentId, formData));
    } else {
      dispatch(AddCommentToPost(formData));
    }
  };

  return (
    <form
      action=""
      className="flex items-center space-x-2 p-3 bg-gray-100 rounded-full"
      onSubmit={formSubmitHandler}
    >
      <input
        type="text"
        name="comment"
        id="comment"
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="flex-grow px-4 py-2 bg-transparent border-0 outline-none focus:ring-0 text-gray-700"
      />
      <Button className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600">
        Post
      </Button>
    </form>
  );
};

export default AddComment;
