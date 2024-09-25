import AdminSidebar from "@/components/ui/AdminSidebar";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  GalleryHorizontalEnd,
  LayoutGrid,
  MessageCircleMore,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryForm from "@/components/ui/CategoryForm";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetCategories } from "@/redux/apiCalls/categoryApiCall";
import { GetUsers } from "@/redux/apiCalls/profileApiCall";
import { FetchPosts } from "@/redux/apiCalls/postsApiCall";
import { FetchComments } from "@/redux/apiCalls/commentApiCall";

const AdminDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { categories } = useSelector((state) => state.category);
  const { users } = useSelector((state) => state.profile);
  const { posts } = useSelector((state) => state.post);
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCategories());
    dispatch(GetUsers());
    dispatch(FetchPosts());
    dispatch(FetchComments());
  }, []);
  return (
    <div className="flex flex-col lg:flex-row min-h-screen h-full">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 bg-gray-100">
        {/* Dashboard Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-md rounded-lg p-6">
            <CardContent className="flex flex-col items-center justify-between">
              <User className="text-cyan-600 w-12 h-12 mb-4" />
              <span className="text-xl font-semibold text-gray-800">Users</span>
              <span className="text-3xl font-bold text-cyan-600">
                {users.length}
              </span>
              <Link to={"/admin-dashboard/users-table"}>
                <Button className="mt-4 bg-cyan-600 text-white">
                  See all users
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-lg p-6">
            <CardContent className="flex flex-col items-center justify-between">
              <GalleryHorizontalEnd className="text-cyan-600 w-12 h-12 mb-4" />
              <span className="text-xl font-semibold text-gray-800">Posts</span>
              <span className="text-3xl font-bold text-cyan-600">
                {posts.length}
              </span>
              <Link to={"/admin-dashboard/posts-table"}>
                <Button className="mt-4 bg-cyan-600 text-white">
                  See all posts
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-lg p-6">
            <CardContent className="flex flex-col items-center justify-between">
              <LayoutGrid className="text-cyan-600 w-12 h-12 mb-4" />
              <span className="text-xl font-semibold text-gray-800">
                Categories
              </span>
              <span className="text-3xl font-bold text-cyan-600">
                {categories?.length}
              </span>
              <Link to={"/admin-dashboard/categories-table"}>
                <Button className="mt-4 bg-cyan-600 text-white">
                  See all categories
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-lg p-6">
            <CardContent className="flex flex-col items-center justify-between">
              <MessageCircleMore className="text-cyan-600 w-12 h-12 mb-4" />
              <span className="text-xl font-semibold text-gray-800">
                Comments
              </span>
              <span className="text-3xl font-bold text-cyan-600">
                {comments.length}
              </span>
              <Link to={"/admin-dashboard/comments-table"}>
                <Button className="mt-4 bg-cyan-600 text-white">
                  See all comments
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Category Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Add New Category
          </h2>
          <CategoryForm />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
