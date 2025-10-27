import { ACTION_TYPES } from "./action-types";

export const editBid = (updatedPostData) => ({
  type: ACTION_TYPES.EDIT_BID,
  payload: updatedPostData,
});
