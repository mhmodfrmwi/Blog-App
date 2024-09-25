import PostsList from "@/components/ui/PostsList";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchPostsWithCategory } from "@/redux/apiCalls/postsApiCall.js";
const Category = () => {
  const { category } = useParams();
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(FetchPostsWithCategory(category));
  }, [category]);
  return (
    <div className="flex flex-col gap-5 p-6 bg-white shadow-md rounded-lg w-3/4 mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 underline underline-offset-8 decoration-4 decoration-cyan-500 mb-6 text-center">
        Posts based on {category}
      </h1>
      <PostsList posts={posts} />
    </div>
  );
};
export default Category;
