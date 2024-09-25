import { request } from "@/utils/request";
import { toast } from "react-toastify";
import { passwordActions } from "../reducers/passwordSlice";

export function ForgetPassword(email) {
  return async () => {
    try {
      const { data } = await request.post(
        "/api/password/reset-password-link",
        email
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function GetResetPassword(userId, token) {
  return async (dispatch) => {
    dispatch(passwordActions.setIsLoading());
    try {
      const { data } = await request.get(
        `/api/password/reset-password/${userId}/${token}`
      );
      setTimeout(() => {
        dispatch(passwordActions.setIsSuccess());
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        dispatch(passwordActions.setIsError());
      }, 1000);
      toast.error(error.response.data.message);
    }
  };
}

export function ResetThePassword(newPassword, user) {
  return async () => {
    try {
      const { data } = await request.post(
        `/api/password/reset-password/${user.userId}/${user.token}`,
        { password: newPassword }
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
