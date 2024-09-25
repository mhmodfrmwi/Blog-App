import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    profilePhoto: null,
    users: [],
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload; // Make sure action.payload contains correct profile data
    },
    setProfilePhoto(state, action) {
      if (state.profile) {
        state.profile.user.profilePhoto = action.payload;
      }
    },
    updateProfile(state, action) {
      state.profile = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
