import { ACTION_TYPES } from "./action-types";

export const getPosts = (posts) => ({
  type: ACTION_TYPES.GET_POSTS,
  payload: posts,
});
