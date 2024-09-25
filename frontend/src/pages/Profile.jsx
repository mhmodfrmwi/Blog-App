import Modal from "@/components/ui/Modal";
import PostsList from "@/components/ui/PostsList";
import ProfileForm from "@/components/ui/ProfileForm";
import { Camera } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  UploadProfilePhoto,
  UserProfile,
} from "@/redux/apiCalls/profileApiCall";
import { ClipLoader } from "react-spinners";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const userProfile = profile ? profile.user : null; // Ensure the profile contains the user object
  const [file, setFile] = useState(null);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) {
      return toast.error("Profile photo is required");
    }
    const formData = new FormData();
    formData.append("image", file);
    dispatch(UploadProfilePhoto(formData));
  };

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        dispatch(UserProfile(id));
      }, 500);
    }
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="w-11/12 max-w-4xl mx-auto mt-10 p-6">
      {userProfile ? (
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center space-y-6 w-full mx-auto">
          {/* User Image */}
          <div className="relative group">
            <img
              src={
                file ? URL.createObjectURL(file) : userProfile.profilePhoto?.url
              }
              alt={userProfile.userName}
              className="w-32 h-32 rounded-full object-cover border-4 border-cyan-600 transition-transform duration-300 group-hover:scale-105"
            />

            {/* Upload Button */}
            {user?._id === userProfile?._id ? (
              <form onSubmit={formSubmitHandler}>
                <label
                  htmlFor="file-upload"
                  className="absolute bottom-14 right-2 bg-cyan-600 text-white p-2 rounded-full cursor-pointer flex items-center justify-center hover:bg-cyan-700 transition-all"
                >
                  <Camera className="w-5 h-5" />
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
                <Button
                  type="submit"
                  className="mt-4 bg-cyan-600 text-white py-2 px-6 rounded-lg hover:bg-cyan-700 transition-all"
                >
                  Upload Photo
                </Button>
              </form>
            ) : (
              ""
            )}
          </div>

          {/* User Info */}
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight leading-tight">
            {userProfile.userName}
          </h1>

          <p className="text-lg text-gray-700 text-center px-6 max-w-md leading-relaxed">
            {userProfile.bio}
          </p>

          <p className="text-sm text-gray-500">
            Joined on{" "}
            {new Date(userProfile.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Edit Profile Button */}
          {user?._id === userProfile?._id ? (
            <Modal
              form={<ProfileForm user={userProfile} />}
              icon={
                <Button className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-all cursor-pointer">
                  Update Profile
                </Button>
              }
              title={"Profile"}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="p-8 rounded-lg flex flex-col items-center space-y-6 w-full mx-auto">
          <ClipLoader />
        </div>
      )}

      {/* User's Posts Section */}
      {userProfile && (
        <div className="mt-10 flex flex-col gap-10">
          <h1 className="text-xl font-bold text-gray-800">
            {userProfile.userName}'s Posts
          </h1>
          <PostsList
            posts={userProfile.posts}
            username={userProfile.userName}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
