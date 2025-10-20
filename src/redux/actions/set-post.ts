import { ACTION_TYPES } from "./action-types";

export const setPost = (postData) => ({
  type: ACTION_TYPES.SET_POST,
  payload: postData,
});
