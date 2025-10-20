import { ACTION_TYPES } from "./action-types";

export const deleteUser = ({ id }) => ({
  type: ACTION_TYPES.DELETE_USER,
  payload: { id },
});
