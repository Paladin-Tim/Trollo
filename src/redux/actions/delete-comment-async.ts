import { ACTION_TYPES } from "./action-types";
import { request } from "../../utils/request";

export const deleteCommentAsync = (postId, commentId) => (dispatch) =>
  request(`/api/bids/${postId}/comments/${commentId}`, "DELETE").then(() => {
    console.log(commentId);
    dispatch(deleteComment(commentId));
  });
