import { UserRole } from "../../constants/policies/access.control.policy";
import { AuthManager } from "../../services/auth";
import DB from "../../services/data";

export interface UserData {
  readonly id: string;
  readonly fName?: string;
  readonly lName?: string;
  readonly email?: string;
  readonly photo?: string;
  readonly role: UserRole;
}

export class User {
  readonly id: string = "";
  readonly fName: string;
  readonly lName: string;
  readonly email: string;
  readonly photo: string;
  readonly role: UserRole;

  constructor(data: UserData) {
    this.id = data?.id;
    this.fName = data?.fName ?? "";
    this.lName = data?.lName ?? "";
    this.email = data?.email ?? "";
    this.photo = data?.photo ?? "";
    this.role = data?.role ?? UserRole.UNKNOWN;
  }

  static async loadUser(): Promise<User> {
    const authUser = await AuthManager.shared.getUser();
    const databaseUser = await DB.getUser(authUser.id);

    const role =
      databaseUser?.type == UserRole.DOCTOR
        ? UserRole.DOCTOR
        : UserRole.PATIENT;

    let user = new User({ ...databaseUser, role });

    // console.log("Final User", databaseUser);
    return user;
  }
}
