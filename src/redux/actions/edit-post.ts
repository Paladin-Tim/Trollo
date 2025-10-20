import { ACTION_TYPES } from "./action-types";

export const editPost = (updatedPostData) => ({
  type: ACTION_TYPES.EDIT_POST,
  payload: updatedPostData,
});
