import { IAuthContext, LoginStatus } from "./types";
import { AuthActions } from "./types/actions";
import { StateAction } from "../../index";

export default function AuthReducer(
  state: IAuthContext,
  action: StateAction
): IAuthContext {
  const { type, payload } = action;

  switch (type) {
    case AuthActions.LOGOUT_USER:
      return {
        ...state,
        user: undefined,
        isLoggedIn: LoginStatus.LOGGED_OUT,
      };

    case AuthActions.UPDATE_USER:
      const updatedUser = payload?.user; // TODO: come back to this
      return {
        ...state,
        user: updatedUser,
      };
    case AuthActions.LOAD_USER:
      const user = payload?.user;
      const isLoggedIn: LoginStatus =
        user == null ? LoginStatus.LOGGED_OUT : LoginStatus.LOGGED_IN;
      return {
        ...state,
        user,
        isLoggedIn,
      };
    default:
      return state;
  }
}
