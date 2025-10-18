import { ACTION_TYPES } from "../actions";

const initialState = {};

export const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.GET_POSTS:
      return { ...payload };
    default:
      return state;
  }
};
