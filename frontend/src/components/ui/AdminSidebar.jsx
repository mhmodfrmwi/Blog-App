import {
  GalleryHorizontalEnd,
  LayoutGrid,
  MessageCircleMore,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-1/4 max-[770px]:w-full px-6 py-8 bg-white rounded-lg shadow-lg">
      <nav className="mt-4 space-y-6">
        <div className="space-y-3">
          <label className="text-lg font-semibold text-gray-500">
            Dashboard
          </label>

          <Link
            className="flex items-center px-4 py-3 text-gray-600 transition-all duration-300 hover:bg-gray-100 rounded-lg"
            to={`/admin-dashboard/users-table`}
            key="1"
          >
            <User className="w-5 h-5 mr-2" />
            <span className="font-medium">Users</span>
          </Link>

          <Link
            className="flex items-center px-4 py-3 text-gray-600 transition-all duration-300 hover:bg-gray-100 rounded-lg"
            to={`/admin-dashboard/posts-table`}
            key="2"
          >
            <GalleryHorizontalEnd className="w-5 h-5 mr-2" />
            <span className="font-medium">Posts</span>
          </Link>

          <Link
            className="flex items-center px-4 py-3 text-gray-600 transition-all duration-300 hover:bg-gray-100 rounded-lg"
            to={`/admin-dashboard/categories-table`}
            key="3"
          >
            <LayoutGrid className="w-5 h-5 mr-2" />
            <span className="font-medium">Categories</span>
          </Link>

          <Link
            className="flex items-center px-4 py-3 text-gray-600 transition-all duration-300 hover:bg-gray-100 rounded-lg"
            to={`/admin-dashboard/comments-table`}
            key="4"
          >
            <MessageCircleMore className="w-5 h-5 mr-2" />
            <span className="font-medium">Comments</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
