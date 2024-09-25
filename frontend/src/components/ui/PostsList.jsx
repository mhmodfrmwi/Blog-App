import { Link } from "react-router-dom";
import { Button } from "./button";
import PostItem from "./PostItem";
import { Skeleton } from "@/components/ui/skeleton"; // Import shadcn skeleton component
import { memo } from "react";
const PostsList = memo(
  ({ posts, width, buttonPath, readAllButton, isLoading, username,home}) => {
    if (isLoading) {
      return (
        <div className={`flex flex-col gap-5 ${width}`}>
          {/* Skeleton loader for posts */}
          {Array(5)
            .fill()
            .map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 p-4 border rounded-lg shadow"
              >
                <Skeleton className="h-6 w-1/2 bg-gray-300 rounded" />
                <Skeleton className="h-4 w-full bg-gray-300 rounded" />
                <Skeleton className="h-4 w-3/4 bg-gray-300 rounded" />
                <Skeleton className="h-4 w-5/6 bg-gray-300 rounded" />
              </div>
            ))}
        </div>
      );
    }

    if (!Array.isArray(posts) || posts.length === 0) {
      return (
        <div
          className={`flex flex-col justify-center items-center h-64 bg-white border border-gray-300 rounded-lg shadow-md p-6 ${width}`}
        >
          <p className="text-xl font-semibold text-gray-500 mb-4">
            No posts available.
          </p>
          {username||home ? (
            ""
          ) : (
            <Link to="/">
              <Button className="bg-cyan-600 text-white hover:bg-cyan-700 transition-all">
                Back to Home
              </Button>
            </Link>
          )}
        </div>
      );
    }

    return (
      <div className={`flex flex-col gap-5 ${width}`}>
        {/* Map through posts and render each PostItem */}
        {posts?.map((post) => {
          return <PostItem post={post} key={post._id} username={username} />;
        })}

        {/* Conditionally render "Read all Posts" button */}
        {readAllButton && (
          <div className="flex justify-center mt-5">
            <Link to={buttonPath}>
              <Button className="w-full bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-all">
                Read All Posts
              </Button>
            </Link>
          </div>
        )}
      </div>
    );
  }
);

export default PostsList;
