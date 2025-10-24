import { ACTION_TYPES } from "../actions";

const initialState = {};

export const bidsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.GET_BID:
      return { ...payload };
    default:
      return state;
  }
};
