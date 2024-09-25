import { toast } from "react-toastify";
import { profileActions } from "../reducers/profileSlice";
import { request } from "@/utils/request";
import { authActions } from "../reducers/authSlice";

export function UserProfile(id) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/${id}`);
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function UploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "/api/users/upload-profile-photo",
        newPhoto,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto)); // Update auth user photo as well if needed
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.profilePhoto = data.profilePhoto;
        localStorage.setItem("user", JSON.stringify(user));
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function UpdateProfile(id, profile) {
  return async (dispatch, getState) => {
    const user = {};
    try {
      for (const pair of profile.entries()) {
        user[pair[0]] = pair[1];
      }
      const { data } = await request.put(`/api/users/${id}`, user, {
        headers: {
          authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.updateProfile(data)); // Update the Redux store
      dispatch(authActions.setUsername(data.userName));

      const userStored = JSON.parse(localStorage.getItem("user"));
      if (user) {
        userStored.userName = data.userName;
        localStorage.setItem("user", JSON.stringify(userStored));
      }

      // Fetch updated profile data here
      dispatch(UserProfile(id)); // This fetches the updated user profile

      toast.success(data.message || "Profile updated successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Profile update failed");
    }
  };
}

export function GetUsers() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/getAllUsers`, {
        headers: {
          authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.setUsers(data.users));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function DeleteUser(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/users/${id}`, {
        headers: {
          authorization: "Bearer " + getState().auth.user.token,
        },
      });
      const currentUsers = getState().profile.users;
      dispatch(
        profileActions.setUsers(currentUsers.filter((u) => u._id !== id))
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
