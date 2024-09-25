import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { memo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostItem = memo(({ post, username }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <Card className="w-full bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-out">
      {/* Image Header */}
      <CardHeader className="relative p-0">
        <img
          src={post?.image?.url}
          alt={post?.title}
          className="w-full h-56 object-cover"
        />
      </CardHeader>

      {/* Content */}
      <CardContent className="p-6">
        {/* User Info and Date */}
        <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
          <Link to={`/profile/${post?.user?._id || post?.user}`}>
            <p className="text-cyan-600 text-lg hover:text-cyan-800 hover:underline font-semibold cursor-pointer transition duration-300 ease-in-out">
              {username ? username : post?.user?.userName}
            </p>
          </Link>
          <p className="text-gray-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Title and Category */}
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-2xl text-gray-800 truncate">
            {post.title.length > 20
              ? `${post.title.slice(0, 20)}...`
              : post.title}
          </p>
          <div className="flex bg-cyan-50 border border-cyan-600 px-4 py-1 rounded-full shadow-sm">
            <p className="text-cyan-600 font-medium truncate">
              {post.category}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {post.description.length > 100
            ? `${post.description.slice(0, 100)}...`
            : post.description}
        </p>
      </CardContent>

      {/* Footer - Read More Button */}
      <CardFooter className="p-6">
        <Button
          onClick={() => {
            if (!user) {
              return toast.warning("Login to see this");
            }
            navigate(`/posts/${post._id}`);
          }}
          className="w-full bg-cyan-600 text-white hover:bg-cyan-700 transition-colors duration-300 font-semibold py-3 rounded-full shadow-lg"
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
});

export default PostItem;
