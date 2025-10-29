import { ACTION_TYPES } from "./action-types";

export const searchBids = (searchPhrase: string) => ({
  type: ACTION_TYPES.SEARCH_BIDS,
  payload: { searchPhrase },
});
