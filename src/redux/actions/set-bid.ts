import { ACTION_TYPES } from "./action-types";

export const setBid = (bidData) => ({
  type: ACTION_TYPES.SET_BID,
  payload: bidData,
});
