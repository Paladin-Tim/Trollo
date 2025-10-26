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
    case ACTION_TYPES.EDIT_POST:
      return { ...state, ...payload };
    case ACTION_TYPES.SET_BID:
      return { ...state, ...payload };
    case ACTION_TYPES.RESET_POST:
      return initialState;
    case ACTION_TYPES.DELETE_POST:
      return initialState;
    case ACTION_TYPES.ADD_COMMENT:
      return { ...state, comments: { ...state.comments, ...payload } };
    case ACTION_TYPES.DELETE_COMMENT:
      // console.log(
      //   Object.values(state.comments).find(
      //     (comment) => comment.id === payload.comment_id
      //   )
      // );
      // const x = Object.values(state.comments).find(
      //   (comment) => comment.id === payload.comment_id
      // );
      console.log(state.comments);
      delete state.comments[payload.comment_id];
      return { ...state };
    default:
      return state;
  }
};
