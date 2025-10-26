import { ACTION_TYPES } from "./action-types";

export const getBids = (bids) => ({
  type: ACTION_TYPES.GET_BIDS,
  payload: bids,
});
