import { ACTION_TYPES } from "./action-types";

export const deleteBid = (bidId) => ({
  type: ACTION_TYPES.DELETE_BID,
  payload: bidId,
});
