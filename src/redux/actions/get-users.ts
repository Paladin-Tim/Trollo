import { ACTION_TYPES } from "./action-types";

export const getUsers = (users) => ({
  type: ACTION_TYPES.GET_USERS,
  payload: users,
});
