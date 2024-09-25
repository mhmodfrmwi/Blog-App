import PostForm from "@/components/ui/PostForm";
import { useEffect } from "react";

const CreatePosts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Create New Post</h1>
      <PostForm />
    </div>
  );
};

export default CreatePosts;
