import { StateProps } from "../../index";
import { useCallback, useEffect, useReducer } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import { defaultState, DoctorDetails, LoginStatus, PatientDetails } from "./types";
import { AuthActions } from "./types/actions";
import { AuthCredentials, AuthManager } from "../../../services/auth";
import { User } from "../../../models/shared/user.model";
import DB from "../../../services/data";
import { UserRole } from "../../../constants/policies/access.control.policy";

export const AuthState = (props: StateProps) => {
  const [state, dispatch] = useReducer(AuthReducer, defaultState);


  const createPatient = async (userData: PatientDetails) => {
    DB.createPatient(userData)
    return DB.createUser({ ...userData, type: UserRole.PATIENT })
  }

  const createDoctor = (userData: DoctorDetails) => {
    DB.createPatient(userData)
    return DB.createUser({ ...userData, type: UserRole.DOCTOR })
  }


  const login = useCallback(async (credentials: AuthCredentials) => {
    const cognitoUser = await AuthManager.shared.login(credentials);
    await loadUser();
    console.warn('COGNITO USER: ', cognitoUser)
    return cognitoUser;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signup = useCallback(async (credentials: AuthCredentials) => {
    const newUser = await AuthManager.shared.signup(credentials);

    return newUser;
  }, []);

  const verify = useCallback(async (credentials: AuthCredentials, verificationCode: string) => {
    const data = await AuthManager.shared.verify(credentials, verificationCode);

    return data
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
        signup: signup,
        verify: verify,
        createDoctor,
        createPatient
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
