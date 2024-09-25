import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    registerationMessage: null,
    isEmailVerfied: false,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.registerationMessage = null;
    },
    logout(state, action) {
      state.user = null;
    },
    register(state, action) {
      state.registerationMessage = action.payload;
    },
    setUserPhoto(state, action) {
      state.user.profilePhoto = action.payload;
    },
    setUsername(state, action) {
      state.user.userName = action.payload;
    },
    setIsEmailVerfied(state) {
      state.isEmailVerfied = true;
      state.registerationMessage = null;
    },
  },
});
const authReducer = authSlice.reducer;
const authActions = authSlice.actions;
export { authReducer, authActions };
