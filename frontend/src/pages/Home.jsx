import Sidebar from "@/components/ui/Sidbar";
import homeImage from "../assets/home-bg.jpg";
import PostsList from "../components/ui/PostsList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchPosts } from "@/redux/apiCalls/postsApiCall";
import { memo } from "react";
const Home = memo(() => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(FetchPosts(1)).finally(() => setIsLoading(false));
  }, []);
  const { posts } = useSelector((state) => state.post);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <div className="relative">
        <img
          src={homeImage}
          className="w-full h-[28rem] object-cover rounded-lg shadow-md"
          alt="Home Background"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-md">
            Welcome to Our Blog
          </h1>
        </div>
      </div>

      {/* Latest Posts Section */}
      <h1 className="text-4xl font-bold text-gray-900 underline underline-offset-8 decoration-4 decoration-cyan-500 mt-10 mb-6 text-center">
        Latest Posts
      </h1>

      <div className="flex justify-between gap-8 py-5 max-[770px]:flex-col-reverse">
        {/* Posts List */}
        <PostsList
          posts={posts}
          width={"lg:w-2/3 w-full"}
          readAllButton={true}
          buttonPath={"/posts"}
          isLoading={isLoading}
          home={true}
        />

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
});

export default Home;
