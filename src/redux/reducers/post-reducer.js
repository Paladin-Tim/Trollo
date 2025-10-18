import { ACTION_TYPES } from "../actions";

const initialState = {
  id: "",
  title: "",
  content: "",
  image_urls: {},
  published_at: "",
  comments: {},
};

export const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.EDIT_POST:
      return { ...state, ...payload };
    case ACTION_TYPES.SET_POST:
      return { ...state, ...payload };
    case ACTION_TYPES.RESET_POST:
      return initialState;
    case ACTION_TYPES.DELETE_POST:
      return initialState;
    case ACTION_TYPES.ADD_COMMENT:
      return { ...state, comments: { ...state.comments, ...payload } };
    case ACTION_TYPES.DELETE_COMMENT:
      delete state.comments[payload.comment_id];
      return { ...state };
    default:
      return state;
  }
};
