import { Button } from "@/components/ui/button";
import {
  GetResetPassword,
  ResetThePassword,
} from "@/redux/apiCalls/passwordApiCall";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isError, isLoading } = useSelector((state) => state.password); // Add loading state
  const [password, setPassword] = useState("");
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(GetResetPassword(userId, token));
  }, [userId, token]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      return toast.error("Password is empty!");
    }
    dispatch(ResetThePassword(password, { userId, token }));
  };

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-gray-50"
        onSubmit={formSubmitHandler}
      >
        <ClipLoader />
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-50"
      onSubmit={formSubmitHandler}
    >
      {isError ? (
        <p>Not Found</p>
      ) : (
        <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-cyan-600">
            Reset Password
          </h2>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
          </div>
          <Button className="w-full bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
