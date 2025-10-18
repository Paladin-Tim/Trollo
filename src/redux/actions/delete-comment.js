import { ACTION_TYPES } from "./action-types";

export const deleteComment = ({ post_id, comment_id }) => ({
  type: ACTION_TYPES.DELETE_COMMENT,
  payload: { post_id, comment_id },
});
