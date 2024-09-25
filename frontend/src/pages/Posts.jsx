import PostsList from "@/components/ui/PostsList";
import { useEffect, useState } from "react";
import PaginationComponent from "@/components/ui/paginationComponent.jsx";
import { useDispatch, useSelector } from "react-redux";
import { FetchPosts } from "@/redux/apiCalls/postsApiCall";

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(FetchPosts(currentPage)).finally(() => setIsLoading(false));
  }, [currentPage]);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-3/5 mx-auto p-6">
      {/* Section Title */}
      <h1 className="text-4xl font-bold text-gray-900 underline underline-offset-8 decoration-4 decoration-cyan-500 mb-8 text-center">
        All Posts
      </h1>

      {/* Posts List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <PostsList
          posts={currentPosts}
          width="w-full"
          readAllButton={false}
          isLoading={isLoading} // Pass the isLoading state
        />
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Posts;
