import { Button } from "@/components/ui/button";
import { VerifyEmailAddress } from "@/redux/apiCalls/authApiCall";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const VerifyEmail = () => {
  const { isEmailVerfied } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, token } = useParams();
  useEffect(() => {
    dispatch(VerifyEmailAddress(userId, token));
  }, [userId, token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {isEmailVerfied ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-semibold text-cyan-600 mb-4">
            Your Email is verified successfully
          </h1>
          <Button
            className="bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors"
            onClick={() => navigate("/login")}
          >
            Go to login
          </Button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-semibold text-red-600">Not found</h1>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
