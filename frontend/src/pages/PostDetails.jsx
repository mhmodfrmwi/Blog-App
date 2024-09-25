import { Button } from "@/components/ui/button";
import { SquarePen, ThumbsUp, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddComment from "@/components/ui/AddComment";
import CommentsList from "@/components/ui/CommentsList";
import Modal from "@/components/ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  DeletePost,
  FetchPostDetails,
  SetPostImage,
  ToggleLike,
} from "@/redux/apiCalls/postsApiCall";
import UpdatePostForm from "@/components/ui/UpdatePostForm";

const PostDetails = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(FetchPostDetails(postId));
  }, [postId]);

  useEffect(() => {
    if (post && user) {
      setLiked(post.likes.includes(user._id));
      setLikesCount(post.likes.length);
    }
  }, [post, user]);

  const toggleLikeHandler = async () => {
    try {
      dispatch(ToggleLike(post?._id));
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      toast.error("Failed to toggle like");
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) {
      return toast.error("Post photo is required");
    }

    if (!file.type.startsWith("image/")) {
      return toast.error("Invalid file type. Please upload an image.");
    }

    const formData = new FormData();
    formData.append("image", file);

    dispatch(SetPostImage(formData, postId))
      .then(() => {
        setFile(null);
        toast.success("Image uploaded successfully");
      })
      .catch(() => toast.error("Failed to upload image"));
  };

  const deletePostHandler = async () => {
    try {
      dispatch(DeletePost(postId));
      toast.success("Post deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  return (
    <div className="flex flex-col gap-5 p-6 bg-white mt-4 w-full md:w-3/5 mx-auto shadow-md rounded-lg">
      <img
        src={
          file
            ? URL.createObjectURL(file)
            : post?.image?.url || "/default-image.jpg"
        }
        alt="Post Image"
        className="w-full max-w-full h-auto object-cover rounded-md mb-4"
      />

      {user?._id === post?.user?._id && (
        <form
          onSubmit={formSubmitHandler}
          className="mb-4 p-4 bg-white rounded-lg"
        >
          <label className="block text-gray-600 font-medium mb-2">
            Upload photo
            <input
              type="file"
              className="block mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <Button
            type="submit"
            className="mt-4 bg-cyan-600 text-white py-2 px-6 rounded-lg hover:bg-cyan-700"
          >
            Upload
          </Button>
        </form>
      )}

      <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>

      <div className="flex items-center mb-4">
        <Link to={`/profile/${post?.user?._id}`}>
          <img
            src={post?.user?.profilePhoto?.url}
            alt="User Avatar"
            className="w-12 h-12 rounded-full mr-4"
          />
        </Link>

        <div>
          <Link to={`/profile/${post?.user?._id}`}>
            <h1 className="text-xl font-semibold">{post?.user?.userName}</h1>
          </Link>
          <p className="text-gray-500 text-sm">
            {new Date(post?.createdAt).toDateString()}
          </p>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{post?.description}</p>

      <div className="flex justify-between items-center border-t pt-4">
        <div className="flex items-center text-gray-600">
          <ThumbsUp
            className={`w-5 h-5 mr-2 cursor-pointer ${
              liked ? "text-cyan-500 fill-current" : "text-gray-400"
            } hover:text-cyan-500`}
            onClick={toggleLikeHandler}
          />
          {likesCount} Likes
        </div>

        {user?._id === post?.user?._id && (
          <div className="flex space-x-4 text-gray-600">
            <Modal
              form={<UpdatePostForm />}
              icon={
                <SquarePen className="w-5 h-5 cursor-pointer hover:text-cyan-500" />
              }
              title={"Post"}
            />
            <Trash
              className="w-5 h-5 cursor-pointer hover:text-red-500"
              onClick={deletePostHandler}
            />
          </div>
        )}
      </div>
      <AddComment postId={postId} />
      <CommentsList comments={post?.comments} />
    </div>
  );
};
export default PostDetails;
