import { ACTION_TYPES } from "../actions/action-types";

const initialState = {};

export const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.GET_USERS:
      return { ...payload };
    case ACTION_TYPES.SAVE_USER_ROLE:
      return {
        ...state,
        [payload.id]: { ...state[payload.id], role_id: payload.roleId },
      };
    case ACTION_TYPES.DELETE_USER:
      delete state[payload.id];
      return { ...state };
    default:
      return state;
  }
};
