import { Auth } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";

export interface AuthCredentials {
  username: string;
  password: string;
}

export class AuthUser {
  readonly id: string;
  readonly email: string;
  readonly fName?: string;
  readonly lName?: string;
  readonly photo?: string;

  constructor(user: CognitoUser) {
    const userData = AuthUser.getUserData(user);
    this.id = userData?.sub ?? "";
    this.fName = userData?.name ?? "";
    this.lName = userData?.["family_name"] ?? "";
    this.photo = userData?.["picture"] ?? "";
    this.email = userData?.email ?? "";

    // this.role = UserRole.ADMIN
  }

  private static getUserData(user: CognitoUser): any {
    return user.getSignInUserSession()?.getIdToken().payload;
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

  login(credentials: AuthCredentials): Promise<any> {
    return Auth.signIn(credentials.username, credentials.password);
  }

  signup(credentials: AuthCredentials): Promise<any> {
    return Auth.signUp({
      username: credentials.username,
      password: credentials.password,
      attributes: {
        email: credentials.username,
      },
    });
  }

  verify(credentials: AuthCredentials, verificationCode: string): Promise<any> {
    return Auth.confirmSignUp(credentials.username, verificationCode);
  }
}
