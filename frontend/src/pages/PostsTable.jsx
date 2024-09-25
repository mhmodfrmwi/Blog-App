import AdminSidebar from "@/components/ui/AdminSidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  DeletePost,
  DeletePostByAdmin,
  FetchPosts,
} from "@/redux/apiCalls/postsApiCall";
import { useNavigate } from "react-router-dom";
const PostsTable = () => {
  const { posts } = useSelector((state) => state.post);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchPosts());
  }, []);
  return (
    <div className="flex flex-col lg:flex-row min-h-screen h-full">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Posts</h2>
        <Table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[100px] px-4 py-2 text-left text-gray-600 font-semibold">
                ID
              </TableHead>

              <TableHead className="px-4 py-2 text-left text-gray-600 font-semibold">
                Title
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600 font-semibold">
                Category
              </TableHead>
              <TableHead className="px-4 py-2 text-right text-gray-600 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow
                key={post._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="px-4 py-3 font-medium text-gray-700">
                  {index + 1}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-700">
                  {post.title}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500">
                  {post.category}
                </TableCell>
                <TableCell className="px-4 py-3 text-right space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigate(`/posts/${post._id}`);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      dispatch(DeletePostByAdmin(post._id));
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default PostsTable;
