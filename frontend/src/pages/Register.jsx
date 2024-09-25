import { Button } from "@/components/ui/button";
import { RegisterUser } from "@/redux/apiCalls/authApiCall";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate here
import { toast } from "react-toastify";

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!userName.trim()) {
      return toast.error("Username is empty!");
    }
    if (!email.trim()) {
      return toast.error("Email is empty!");
    }
    if (!password.trim()) {
      return toast.error("Password is empty!");
    }
    dispatch(RegisterUser({ userName, email, password }));
  };

  return (
    <div className="mt-8 max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <form className="space-y-6" onSubmit={formSubmitHandler}>
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

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
          Register
        </Button>
      </form>

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <Link to={"/login"}>
          <span className="text-cyan-600 hover:text-cyan-700 font-medium cursor-pointer ml-1">
            Login
          </span>
        </Link>
      </p>
    </div>
  );
};

export default Register;
