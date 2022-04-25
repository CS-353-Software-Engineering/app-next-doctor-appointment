import { User } from "../../../../models/shared/user.model";
import { AuthCredentials } from "../../../../services/auth";

export enum LoginStatus {
  LOGGED_IN,
  LOGGED_OUT,
  UNKNOWN,
}

type updateStatusFunctionType = () => Promise<void>;

export interface IAuthContext {
  isLoggedIn: LoginStatus;
  user?: User;
  loading: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: Function;
}

export const defaultState: IAuthContext = {
  isLoggedIn: LoginStatus.UNKNOWN,
  user: undefined,
  loading: false,
  login: async (credentials: AuthCredentials) => {},
  logout: () => {},
};
