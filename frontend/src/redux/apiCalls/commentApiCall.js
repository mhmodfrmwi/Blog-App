import { request } from "@/utils/request";
import { toast } from "react-toastify";
import { postActions } from "../reducers/postSlice";
import { commentActions } from "../reducers/commentSlice";

export const AddCommentToPost = (comment) => {
  return async (dispatch, getState) => {
    try {
      const commentDetails = {};
      for (const pair of comment.entries()) {
        commentDetails[pair[0]] = pair[1];
      }

      // Make the API call to add the comment
      const { data } = await request.post(`/api/comments`, commentDetails, {
        headers: {
          authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.addComment(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const DeleteCommentFromPost = (commentId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/comments/${commentId}`, {
        headers: {
          authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.deleteComment(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
export const UpdateCommentFromPost = (commentId, comment) => {
  return async (dispatch, getState) => {
    try {
      const commentDetails = {};
      for (const pair of comment.entries()) {
        commentDetails[pair[0]] = pair[1];
      }

      const { data } = await request.put(
        `/api/comments/${commentId}`,
        commentDetails,
        {
          headers: {
            authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(postActions.updateComment(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
export function FetchComments() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/comments`, {
        headers: {
          authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(commentActions.setComments(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function DeleteCommentByAdmin(commentId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/comments/${commentId}`, {
        headers: {
          authorization: "Bearer " + getState().auth.user.token,
        },
      });
      const currentComments = getState().comment.comments;
      dispatch(
        commentActions.setComments(
          currentComments.filter((c) => c._id !== commentId)
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
