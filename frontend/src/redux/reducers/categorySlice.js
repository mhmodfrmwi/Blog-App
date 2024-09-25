import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const categoryActions = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
