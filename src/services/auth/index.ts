import { Auth } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";
import { UserRole } from "../../constants/policies/access.control.policy";

export interface AuthCredentials {
  username: string;
  password: string;
}

enum CognitoGroups {
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
  UNKNOWN = "UNKNOWN",
}

export class AuthUser {
  readonly id: string;
  readonly email: string;
  readonly fName?: string;
  readonly lName?: string;
  readonly photo?: string;
  readonly role?: UserRole;

  constructor(user: CognitoUser) {
    const userData = AuthUser.getUserData(user);
    console.log("HELLo123 ZZ", userData);
    this.id = userData?.sub ?? "";
    this.fName = userData?.name ?? "";
    this.lName = userData?.["family_name"] ?? "";
    this.photo = userData?.["picture"] ?? "";
    this.email = userData?.email ?? "";

    const groups = AuthUser.getUserGroups(userData);

    this.role = AuthUser.getUserRole(groups);

    // this.role = UserRole.ADMIN
  }

  private static getUserData(user: CognitoUser): any {
    return user.getSignInUserSession()?.getIdToken().payload;
  }

  private static getUserGroups(userData: any): [string] {
    return userData?.["cognito:groups"];
  }

  private static getUserRole(roles: [string]): UserRole {
    const userRoles = roles?.map((role) => role.toUpperCase());
    if (userRoles?.includes(CognitoGroups.DOCTOR)) {
      return UserRole.DOCTOR;
    }
    if (userRoles?.includes(CognitoGroups.PATIENT)) {
      return UserRole.PATIENT;
    }
    // #TODO: change to UNKNOWN
    return UserRole.PATIENT;
  }
}

export class AuthManager {
  static shared = new AuthManager();
  private cognitoUser?: AuthUser;

  private constructor() {}

  async getUser(): Promise<AuthUser> {
    if (this.cognitoUser != null || this.cognitoUser != undefined) {
      return this.cognitoUser;
    }
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const user = new AuthUser(cognitoUser);
    this.cognitoUser = user;
    return user;
  }

  logout(): Promise<any> {
    return Auth.signOut();
  }

  login(credentials: AuthCredentials): Promise<CognitoUser | any> {
    return Auth.signIn(credentials.username, credentials.password);
  }

  async signup(credentials: AuthCredentials): Promise<CognitoUser> {
    const result = await Auth.signUp({
      username: credentials.username,
      password: credentials.password,
      attributes: {
        email: credentials.username,
      },
    });

    return result?.user;
  }

  verify(credentials: AuthCredentials, verificationCode: string): Promise<any> {
    return Auth.confirmSignUp(credentials.username, verificationCode);
  }
}
