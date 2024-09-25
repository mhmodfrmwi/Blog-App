import { GetCategories } from "@/redux/apiCalls/categoryApiCall";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCategories());
  }, []);
  const { categories } = useSelector((state) => state.category);
  return (
    <aside className="flex flex-col w-1/4 max-[770px]:w-full h-full px-6 py-8 bg-white dark:bg-[#262626] border-r rtl:border-r-0 rtl:border-l border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
      <div className="flex flex-col justify-start mt-4">
        <nav className="space-y-6">
          <div className="space-y-3">
            <label className="text-lg font-semibold text-gray-600 dark:text-gray-300 uppercase">
              Categories
            </label>
            {categories?.map((category) => (
              <Link
                className="flex items-center px-4 py-3 text-gray-700 dark:text-white bg-[#FAFAFA] dark:bg-[#262626] transition-all duration-300 ease-in-out transform rounded-lg hover:bg-gray-100 dark:hover:bg-[#333] hover:shadow-lg"
                to={`/posts/categories/${category?.title}`}
                key={category?._id}
              >
                <span className="ml-2 text-base font-medium">
                  {category?.title}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
