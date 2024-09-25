import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    isError: false,
    isLoading: false, // New loading state
  },
  reducers: {
    setIsError(state) {
      state.isError = true;
      state.isLoading = false;
    },
    setIsLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },

    setIsSuccess(state) {
      state.isLoading = false;
      state.isError = false;
    },
  },
});

export const passwordActions = passwordSlice.actions;
export const passwordReducer = passwordSlice.reducer;
