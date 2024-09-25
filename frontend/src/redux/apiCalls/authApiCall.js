import { request } from "@/utils/request";
import { authActions } from "../reducers/authSlice";
import { toast } from "react-toastify";

export function LoginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);
      dispatch(authActions.login(data));
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function LogoutUser() {
  return async (dispatch) => {
    try {
      dispatch(authActions.logout());
      localStorage.removeItem("user");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function RegisterUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      dispatch(authActions.register(data.message));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function VerifyEmailAddress(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);
      dispatch(authActions.setIsEmailVerfied());
    } catch (error) {
      setTimeout(() => {
        toast.error(error.response.data.message);
      }, 5000);
    }
  };
}
