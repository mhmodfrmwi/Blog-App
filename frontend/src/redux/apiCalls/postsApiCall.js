import { toast } from "react-toastify";
import { request } from "@/utils/request";
import { postActions } from "../reducers/postSlice";

export function FetchPosts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts`);
      dispatch(postActions.setPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function FetchPostsWithCategory(category) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/posts?category=${category}`, {
        headers: {
          authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(postActions.setPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function CreatePost(post) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading());
      const { data } = await request.post(`/api/posts`, post, {
        headers: {
          authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(postActions.setIsPostCreated());
      setTimeout(() => {
        dispatch(postActions.clearIsPostCreated());
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.clearLoading());
    }
  };
}

export function FetchPostDetails(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/posts/${postId}`, {
        headers: {
          authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.setPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function ToggleLike(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: {
            authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(postActions.setLike(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function SetPostImage(image, postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/posts/update-post-photo/${postId}`,
        image,
        {
          headers: {
            authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(postActions.setImage(data));
      toast.success("Photo uploaded successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function UpdatePost(post, postId) {
  return async (dispatch, getState) => {
    try {
      let postDetails = {};
      dispatch(postActions.setLoading());
      for (const pair of post.entries()) {
        postDetails[pair[0]] = pair[1];
      }

      const { data } = await request.put(`/api/posts/${postId}`, postDetails, {
        headers: {
          authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.setIsPostCreated());
      setTimeout(() => {
        dispatch(postActions.clearIsPostCreated());
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.clearLoading());
    }
  };
}

export function DeletePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${postId}`, {
        headers: {
          authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.deletePost(data.post));

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function DeletePostByAdmin(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${postId}`, {
        headers: {
          authorization: "Bearer " + getState().auth.user.token,
        },
      });
      const currentPosts = getState().post.posts;
      dispatch(
        postActions.setPosts(currentPosts.filter((p) => p._id !== postId))
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
