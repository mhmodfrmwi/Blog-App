import { request } from "@/utils/request";
import { categoryActions } from "../reducers/categorySlice";
import { toast } from "react-toastify";

export function GetCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/categories`);
      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function AddCategory(category) {
  return async (dispatch, getState) => {
    try {
      const categoryDetails = {};
      for (const pair of category.entries()) {
        categoryDetails[pair[0]] = pair[1];
      }
      const { data: newCategory } = await request.post(
        `/api/categories`,
        categoryDetails,
        {
          headers: {
            authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      const currentCategories = getState().category.categories;
      dispatch(
        categoryActions.setCategories([...currentCategories, newCategory])
      );
      toast.success("Category has been added successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function DeleteCategory(category) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${category._id}`, {
        headers: {
          authorization: "Bearer " + getState().auth.user.token,
        },
      });
      const currentCategories = getState().category.categories;

      dispatch(
        categoryActions.setCategories(
          currentCategories.filter((c) => c._id !== data.category.id)
        )
      );
      toast.success("Category has been added successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
