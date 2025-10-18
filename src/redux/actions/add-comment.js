import { ACTION_TYPES } from "./action-types";

export const addComment = (newComment) => ({
  type: ACTION_TYPES.ADD_COMMENT,
  payload: newComment,
});
