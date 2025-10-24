import { ACTION_TYPES } from "./action-types";

export const deleteComment = ({ comment_id }) => ({
  type: ACTION_TYPES.DELETE_COMMENT,
  payload: { comment_id },
});
