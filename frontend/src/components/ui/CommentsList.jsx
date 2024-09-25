import { SquarePen, Trash } from "lucide-react";
import AddComment from "./AddComment";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCommentFromPost } from "@/redux/apiCalls/commentApiCall";

const CommentsList = ({ comments }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Comments</h2>
      {comments && comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment) => {
            return (
              <li
                key={comment?._id}
                className="flex items-start space-x-4 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Avatar */}

                <div className="flex-1">
                  {/* Username */}
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {comment?.userName}
                  </h3>
                  {/* Comment Text */}
                  <p className="text-gray-700 text-sm mb-2">{comment?.text}</p>
                  {/* Timestamp */}
                  <p className="text-xs text-gray-400">
                    {new Date(comment?.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                {user._id === comment?.userId && (
                  <div className="flex items-center space-x-3">
                    <Modal
                      form={
                        <AddComment
                          update={true}
                          commentId={comment?._id}
                          postId={comment?.postId}
                        />
                      }
                      icon={
                        <SquarePen className="w-5 h-5 cursor-pointer text-gray-500 hover:text-cyan-500 transition-colors duration-200" />
                      }
                      title={"Edit Comment"}
                    />
                    <Trash
                      className="w-5 h-5 cursor-pointer text-gray-500 hover:text-red-500 transition-colors duration-200"
                      onClick={() => {
                        /* delete comment logic */
                        dispatch(DeleteCommentFromPost(comment?._id));
                      }}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
};

export default CommentsList;
