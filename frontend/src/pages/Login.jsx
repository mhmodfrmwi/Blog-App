import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginUser } from "@/redux/apiCalls/authApiCall";
import { toast } from "react-toastify";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      return toast.error("Email is empty!");
    }
    if (!password.trim()) {
      return toast.error("Password is empty!");
    }
    dispatch(LoginUser({ email, password }));
  };
  return (
    <div className="mt-8 max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <form className="space-y-6" onSubmit={formSubmitHandler}>
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-cyan-600 text-white font-semibold py-2 rounded-lg hover:bg-cyan-700 transition-all"
        >
          Login
        </Button>
      </form>

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Do not you have an account?
        <Link to={"/register"}>
          <span className="text-cyan-600 hover:text-cyan-700 font-medium cursor-pointer ml-1">
            Register
          </span>
        </Link>
      </p>
      <p className="mt-6 text-center text-sm text-gray-600">
        Did you forget the password?
        <Link to={"/forgot-password"}>
          <span className="text-cyan-600 hover:text-cyan-700 font-medium cursor-pointer ml-1">
            Forgot Password
          </span>
        </Link>
      </p>
    </div>
  );
};
export default Login;
