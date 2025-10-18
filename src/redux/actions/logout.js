import { server } from "../../bff";
import { ACTION_TYPES } from "./action-types";

export const logout = (session) => {
  server.logout(session);

  return {
    type: ACTION_TYPES.LOGOUT,
  };
};
