import { User } from "../../../../models/shared/user.model";

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
  login: Function;
  logout: Function;
}

export const defaultState: IAuthContext = {
  isLoggedIn: LoginStatus.UNKNOWN,
  user: undefined,
  loading: false,
  login: () => {},
  logout: () => {},
};
