import { Button } from "@/components/ui/button";
import { ForgetPassword } from "@/redux/apiCalls/passwordApiCall";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      return toast.error("Email is empty!");
    }

    dispatch(ForgetPassword({ email }));
  };

  return (
    <div
      className="mt-8 max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg"
      onSubmit={formSubmitHandler}
    >
      <form className="space-y-6">
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
            value={email}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-cyan-600 text-white font-semibold py-2 rounded-lg hover:bg-cyan-700 transition-all"
        >
          Reset
        </Button>
      </form>
    </div>
  );
};
export default ForgotPassword;
