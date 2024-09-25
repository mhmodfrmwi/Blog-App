import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authSlice";
import { profileReducer } from "./reducers/profileSlice";
import { postReducer } from "./reducers/postSlice";
import { categoryReducer } from "./reducers/categorySlice";
import { commentReducer } from "./reducers/commentSlice";
import { passwordReducer } from "./reducers/passwordSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    category: categoryReducer,
    comment: commentReducer,
    password: passwordReducer,
  },
});
