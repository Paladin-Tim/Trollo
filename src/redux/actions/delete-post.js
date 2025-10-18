import { ACTION_TYPES } from "./action-types";

export const deletePost = ({ post_id }) => ({
  type: ACTION_TYPES.DELETE_POST,
  payload: post_id,
});
