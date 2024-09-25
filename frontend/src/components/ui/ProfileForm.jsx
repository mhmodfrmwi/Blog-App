import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./button";
import { useDispatch } from "react-redux";
import { UpdateProfile } from "@/redux/apiCalls/profileApiCall";

const ProfileForm = ({ user }) => {
  const [userName, setUserName] = useState(user.userName);
  const [bio, setBio] = useState(user.bio);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!userName.trim()) {
      return toast.error("Username cannot be empty!");
    }
    if (!bio.trim()) {
      return toast.error("Bio cannot be empty!");
    }

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("bio", bio);

    if (password.trim()) {
      formData.append("password", password);
    }

    dispatch(UpdateProfile(user?._id, formData));
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className="bg-white dark:bg-[#262626] p-6 shadow-md rounded-lg space-y-4 border border-gray-300 dark:border-gray-700"
    >
      <input
        type="text"
        placeholder="Username"
        className="w-full px-4 py-2 bg-[#FAFAFA] dark:bg-[#262626] text-[#262626] dark:text-white border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0095F6] transition-all"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />
      <input
        type="text"
        placeholder="Bio"
        className="w-full px-4 py-2 bg-[#FAFAFA] dark:bg-[#262626] text-[#262626] dark:text-white border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0095F6] transition-all"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
      />
      <input
        type="password"
        placeholder="New Password (leave blank if unchanged)"
        className="w-full px-4 py-2 bg-[#FAFAFA] dark:bg-[#262626] text-[#262626] dark:text-white border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0095F6] transition-all"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button
        type="submit"
        className="w-full mt-4 bg-[#0095F6] text-white py-2 px-6 rounded-lg hover:bg-[#007BB5] transition-colors duration-300"
      >
        Update Profile
      </Button>
    </form>
  );
};

export default ProfileForm;
