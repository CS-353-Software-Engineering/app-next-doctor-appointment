import { StateProps } from "../../index";
import { useCallback, useEffect, useReducer } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import { defaultState, LoginStatus } from "./types";
import { AuthActions } from "./types/actions";
import { AuthCredentials, AuthManager } from "../../../services/auth";
import { User } from "../../../models/shared/user.model";

export const AuthState = (props: StateProps) => {
  const [state, dispatch] = useReducer(AuthReducer, defaultState);

  const login = useCallback(async (credentials: AuthCredentials) => {
    await AuthManager.shared.login(credentials);
    await loadUser();
  }, []);

  const loadUser = useCallback(async () => {
    const user = await User.loadUser();
    dispatch({
      type: AuthActions.LOAD_USER,
      payload: { user },
    });
  }, []);

  const logout = useCallback(async () => {
    await AuthManager.shared.logout();
    dispatch({ type: AuthActions.LOGOUT_USER, payload: null });
  }, []);

  //Load User
  useEffect(() => {
    if (!(state.isLoggedIn === LoginStatus.UNKNOWN)) {
      return;
    }
    loadUser()
      .then()
      .catch((error) => {
        dispatch({ type: AuthActions.LOAD_USER, payload: null });
      });
  }, [loadUser, state.isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
