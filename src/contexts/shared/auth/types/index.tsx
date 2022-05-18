import { User } from "../../../../models/shared/user.model";
import { AuthCredentials } from "../../../../services/auth";
import { CognitoUser } from "amazon-cognito-identity-js";
import { UserRole } from "../../../../constants/policies/access.control.policy";

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
  login: (credentials: AuthCredentials) => Promise<CognitoUser | any>;
  logout: Function;
  signup: (credentials: AuthCredentials) => Promise<CognitoUser | void>;
  verify: (credentials: AuthCredentials, verificationCode: string) => Promise<any>;
  createPatient: (details: PatientDetails) => Promise<void>,
  createDoctor: (details: PatientDetails) => Promise<void>,
}

export const defaultState: IAuthContext = {
  isLoggedIn: LoginStatus.UNKNOWN,
  user: undefined,
  loading: false,
  login: async (credentials: AuthCredentials) => Promise.resolve(),
  logout: () => { },
  signup: async (credentials: AuthCredentials) => Promise.resolve(),
  verify: async (credentials: AuthCredentials, verificationCode: string) => Promise.resolve(),
  createDoctor: async (details: DoctorDetails) => { },
  createPatient: async (details: PatientDetails) => { },
};


export interface BasicUserDetails {
  id: string
  email: string
  type: UserRole
}


export interface PatientDetails extends BasicUserDetails {
  fName: string;
  lName: string;
  number: string;
}

export interface DoctorDetails extends BasicUserDetails {
  fName: string;
  lName: string;
  number: string;
}