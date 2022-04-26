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
  signup: (credentials: AuthCredentials) => Promise<void>;
  verify: (credentials: AuthCredentials, verificationCode: string) => Promise<void>;
}

export const defaultState: IAuthContext = {
  isLoggedIn: LoginStatus.UNKNOWN,
  user: undefined,
  loading: false,
  login: async (credentials: AuthCredentials) => { },
  logout: () => { },
  signup: async (credentials: AuthCredentials) => { },
  verify: async (credentials: AuthCredentials, verificationCode: string) => { },
};
