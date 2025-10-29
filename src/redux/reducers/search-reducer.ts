import { ACTION_TYPES } from "../actions";

const initialState = {
  searchPhrase: "",
  filters: {},
  searchResults: [],
};

export const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.SEARCH_BIDS:
      return {
        ...state,
        searchPhrase: payload.searchPhrase,
        searchResults: payload.searchResults,
        filters: payload.filters || state.filters,
      };
    case ACTION_TYPES.CLEAR_SEARCH:
      return initialState;
    default:
      return state;
  }
};
