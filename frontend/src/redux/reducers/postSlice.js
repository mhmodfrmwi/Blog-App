import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postsCount: null,
    postCate: [],
    loading: false,
    isPostCreated: false,
    post: null,
    likes: [],
    image: null,
    comments: [],
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setPostCount(state, action) {
      state.postsCount = action.payload;
    },
    setPostCate(state, action) {
      state.postCate = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsPostCreated(state) {
      state.isPostCreated = true;
      state.loading = false;
    },
    clearIsPostCreated(state) {
      state.isPostCreated = false;
    },
    setPost(state, action) {
      state.post = action.payload;
    },
    setLike(state, action) {
      state.likes = action.payload;
    },
    setImage(state, action) {
      state.image = action.payload;
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((p) => p._id != action.payload);
    },
    addComment(state, action) {
      state.post.comments.push(action.payload);
    },
    deleteComment(state, action) {
      const comment = state.post.comments.find((c) => c.id === action.payload);
      const commentIndex = state.post.comments.indexOf(comment);
      state.post.comments.splice(commentIndex, 1);
    },
    updateComment(state, action) {
      state.post.comments = state.post.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment
      );
    },
  },
});

export const postActions = postSlice.actions;
export const postReducer = postSlice.reducer;
