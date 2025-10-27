import { ACTION_TYPES } from "../actions";

const initialState = {
  id: "",
  regNumber: "",
  title: "",
  content: "",
  status: "",
  priority: "",
  author: "",
  implementer: "",
  publishedAt: "",
  comments: {},
};

export const bidReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.EDIT_BID:
      return { ...state, ...payload };
    case ACTION_TYPES.SET_BID:
      return { ...state, ...payload };
    case ACTION_TYPES.RESET_BID:
      return initialState;
    case ACTION_TYPES.DELETE_BID:
      return initialState;
    case ACTION_TYPES.ADD_COMMENT:
      return { ...state, comments: { ...state.comments, ...payload } };
    case ACTION_TYPES.DELETE_COMMENT: {
      const newComments = Object.values(state.comments).filter(
        (comment) => comment.id !== payload.comment_id
      );
      return { ...state, comments: newComments };
    }
    default:
      return state;
  }
};
