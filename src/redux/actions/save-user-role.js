import { ACTION_TYPES } from "./action-types";

export const saveUserRole = ({ id, roleId }) => ({
  type: ACTION_TYPES.SAVE_USER_ROLE,
  payload: { id, roleId },
});
