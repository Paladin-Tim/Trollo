import { ACTION_TYPES } from "./action-types";
import { request } from "../../utils/request";
import { deleteComment } from "./delete-comment";

export const deleteCommentAsync = (postId, commentId) => (dispatch) =>
  request(`/api/bids/${postId}/comments/${commentId}`, "DELETE").then(() => {
    dispatch(deleteComment(commentId));
  });
