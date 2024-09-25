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
import {
  DeleteCategory,
  GetCategories,
} from "@/redux/apiCalls/categoryApiCall";
import { useEffect } from "react";
const CategoriesTable = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCategories());
  }, []);
  return (
    <div className="flex flex-col lg:flex-row min-h-screen h-full">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Categories</h2>
        <Table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[100px] px-4 py-2 text-left text-gray-600 font-semibold">
                ID
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600 font-semibold">
                Title
              </TableHead>

              <TableHead className="px-4 py-2 text-right text-gray-600 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow
                key={category._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="px-4 py-3 font-medium text-gray-700">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700">
                  {category.title}
                </TableCell>

                <TableCell className="px-4 py-3 text-right space-x-3">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => dispatch(DeleteCategory(category))}
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
export default CategoriesTable;
